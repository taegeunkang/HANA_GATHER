package com.kopo.hanaGatherBackend.core.service;

import com.kopo.hanaGatherBackend.core.dto.*;
import com.kopo.hanaGatherBackend.core.entity.*;
import com.kopo.hanaGatherBackend.core.exception.AlreadyAcceptInvitationException;
import com.kopo.hanaGatherBackend.core.repository.*;
import com.kopo.hanaGatherBackend.notification.service.FirebaseMessagingService;
import com.kopo.hanaGatherBackend.security.JWTUtil;
import com.kopo.hanaGatherBackend.user.entity.MemberInfo;
import com.kopo.hanaGatherBackend.user.exception.UserNotFoundException;
import com.kopo.hanaGatherBackend.user.repository.MemberInfoRepository;
import com.kopo.hanaGatherBackend.util.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;

@Slf4j
@Service
public class CoreService {

    private final DutchPayRepository dutchPayRepository;
    private final DutchPayMemberRepository dutchPayMemberRepository;
    private final MemberInfoRepository memberInfoRepository;
    private final NotificationRepository notificationRepository;
    private final AccountRepository accountRepository;
    private final TransferHistoryRepository transferHistoryRepository;

    private final BandRepository bandRepository;
    private final BandMemberRepository bandMemberRepository;
    private final MeetingRepository meetingRepository;

    private final MeetingMemberRepository meetingMemberRepository;

    private final ApplyRepository applyRepository;

    private final FirebaseMessagingService firebaseMessagingService;

    private final PostRepository postRepository;
    private final MediaRepository mediaRepository;
    private final ThumbnailRepository thumbnailRepository;

    private final ReplyRepository replyRepository;
    private final JWTUtil jwtUtil;
    private final FileUtil fileUtil;

    public CoreService(DutchPayRepository dutchPayRepository, DutchPayMemberRepository dutchPayMemberRepository, MemberInfoRepository memberInfoRepository, NotificationRepository notificationRepository, AccountRepository accountRepository, TransferHistoryRepository transferHistoryRepository, BandRepository bandRepository, BandMemberRepository bandMemberRepository, MeetingRepository meetingRepository, MeetingMemberRepository meetingMemberRepository, ApplyRepository applyRepository, FirebaseMessagingService firebaseMessagingService, PostRepository postRepository, MediaRepository mediaRepository, ThumbnailRepository thumbnailRepository, ReplyRepository replyRepository, JWTUtil jwtUtil, FileUtil fileUtil) {
        this.dutchPayRepository = dutchPayRepository;
        this.dutchPayMemberRepository = dutchPayMemberRepository;
        this.memberInfoRepository = memberInfoRepository;
        this.notificationRepository = notificationRepository;
        this.accountRepository = accountRepository;
        this.transferHistoryRepository = transferHistoryRepository;
        this.bandRepository = bandRepository;
        this.bandMemberRepository = bandMemberRepository;
        this.meetingRepository = meetingRepository;
        this.meetingMemberRepository = meetingMemberRepository;
        this.applyRepository = applyRepository;
        this.firebaseMessagingService = firebaseMessagingService;
        this.postRepository = postRepository;
        this.mediaRepository = mediaRepository;
        this.thumbnailRepository = thumbnailRepository;
        this.replyRepository = replyRepository;
        this.jwtUtil = jwtUtil;
        this.fileUtil = fileUtil;
    }

    @Transactional
    public Long requestDutchPay(DutchPayDto dutchPayRequestDto) {
        DutchPay dutchPay = new DutchPay(null, dutchPayRequestDto.getRequester(), dutchPayRequestDto.getTotalAmount(),dutchPayRequestDto.getAmountPerPerson(), createAccount(), LocalDateTime.now(), LocalDateTime.now());
        dutchPayRepository.save(dutchPay);

        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(dutchPayRequestDto.getRequester());

        DutchPay savedDutchPay = dutchPayRepository.findFirstByMemberId(dutchPayRequestDto.getRequester());
        List<String> members = dutchPayRequestDto.getMember();
        members.add(dutchPayRequestDto.getRequester());

        for(String user : members) {
            DutchPayMember dutchPayMember = new DutchPayMember(savedDutchPay.getId(), user, (user.equals(dutchPayRequestDto.getRequester())) ? savedDutchPay.getAmountPerPerson() : 0L, LocalDateTime.now(), LocalDateTime.now());
            dutchPayMemberRepository.save(dutchPayMember);

            MemberInfo memberInfo1 = memberInfoRepository.findMemberInfoByMemberId(user);

            if(!user.equals(dutchPayRequestDto.getRequester())){
                saveNotification(memberInfo.getNickname() + "님이 정산을 요청하였습니다.",memberInfo1.getMemberId(), memberInfo.getProfileImage(), savedDutchPay.getId(), null, null);

            }
        }


        return savedDutchPay.getId();



    }

    @Transactional(readOnly = true)
    public DutchPayStatusDto getDutchPayStatus(Long dutchPayId) {
        DutchPay dutchPay = dutchPayRepository.findById(dutchPayId);
        MemberInfo requester = memberInfoRepository.findMemberInfoByMemberId(dutchPay.getMemberId());
        List<DutchPayMember> dutchPayMemberList = dutchPayMemberRepository.findByDutchPayId(dutchPayId);
        List<PayStatusDto> payStatus = new ArrayList<>();

        for(DutchPayMember dutchPayMember : dutchPayMemberList){
            MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(dutchPayMember.getMemberId());
            payStatus.add(new PayStatusDto(dutchPayMember.getMemberId(), memberInfo.getNickname(), memberInfo.getProfileImage(), dutchPayMember.getPayedAmount().equals(dutchPay.getAmountPerPerson())));
        }

        return new DutchPayStatusDto(dutchPayId,dutchPay.getTotalAmount(),requester.getMemberId(), requester.getNickname(), requester.getProfileImage(), dutchPay.getVirtualAccountNumber(), dutchPay.getAmountPerPerson(), payStatus, dutchPay.getCreatedDate());
    }

    public HomeProfileResponseDto getHomeProfile(String token) {
        String subject = jwtUtil.getSubject(token.substring(7));

        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        Account account = accountRepository.findById(memberInfo.getAccountId());

        return new HomeProfileResponseDto(memberInfo.getNickname(), memberInfo.getProfileImage(),account.getBalance());
    }

    public List<DutchPayListResponseDto> getDutchPayList(String token, Long page, Long size) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        if(memberInfo == null) throw new UserNotFoundException();

        List<DutchPayListResponseDto> result = new ArrayList<>();

        List<DutchPay> dutchPayList = dutchPayRepository.findAllByMemberIdAndAllMemberNotPayed(subject, page, size);

        for(DutchPay dutchPay : dutchPayList) {
            List<String> memberProfileImageList = new ArrayList<>();

            List<DutchPayMember> payMembers = dutchPayMemberRepository.findByDutchPayId(dutchPay.getId());
            for(DutchPayMember dutchPayMember : payMembers) {
                MemberInfo memberInfo1 = memberInfoRepository.findMemberInfoByMemberId(dutchPayMember.getMemberId());
                memberProfileImageList.add(memberInfo1.getProfileImage());
            }

            result.add(new DutchPayListResponseDto(dutchPay.getId(), memberProfileImageList, dutchPay.getTotalAmount(), dutchPay.getCreatedDate()));

        }

        return result;
    }


    public List<DutchPayListVerticalResponseDto> getDutchPayListVertical(String token, Long page, Long size) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        if(memberInfo == null) throw new UserNotFoundException();

        List<DutchPayListVerticalResponseDto> result = new ArrayList<>();

        List<DutchPay> dutchPayList = dutchPayRepository.findAllByMemberId(subject, page, size);

        for(DutchPay dutchPay : dutchPayList) {
            List<String> memberProfileImageList = new ArrayList<>();

            List<DutchPayMember> payMembers = dutchPayMemberRepository.findByDutchPayId(dutchPay.getId());
            for(DutchPayMember dutchPayMember : payMembers) {
                MemberInfo memberInfo1 = memberInfoRepository.findMemberInfoByMemberId(dutchPayMember.getMemberId());
                memberProfileImageList.add(memberInfo1.getProfileImage());
            }
            Boolean allPayed = true;
            for(DutchPayMember dutchPayMember : payMembers) {
                if(!dutchPayMember.getPayedAmount().equals(dutchPay.getAmountPerPerson())) {
                    allPayed = false;
                }
            }

            result.add(new DutchPayListVerticalResponseDto(dutchPay.getId(), memberProfileImageList, dutchPay.getTotalAmount(),allPayed, dutchPay.getCreatedDate()));

        }

        return result;
    }
    @Transactional
    public void pay(PayDto payRequestDto, String token) {
        String from = jwtUtil.getSubject(token.substring(7));
        transfer(token, payRequestDto.getTo(), payRequestDto.getAmount());
        dutchPayMemberRepository.updatePayedAmountByDutchPayIdAndMemberId(payRequestDto.getAmount(), payRequestDto.getDutchPayId(),from);
    }


    private String createAccount() {
        // 난수 생성을 위한 Random 객체 생성
        Random random = new Random();

        // 난수 생성 및 형식에 맞게 문자열 생성
        int firstPart = random.nextInt(100);
        int secondPart = random.nextInt(1000000);
        int thirdPart = random.nextInt(10000);

        return String.format("%03d-%06d-%05d", firstPart, secondPart, thirdPart);
    }

    @Transactional
    public MakeAccountDto makeAccount() {
        String account = createAccount();
        accountRepository.save(account, 3500000L, LocalDateTime.now(), LocalDateTime.now());
        return new MakeAccountDto(account, 3500000L);
    }
    @Transactional
    public void connectAccount(String token, String account) {
        String subject = jwtUtil.getSubject(token.substring(7));
        memberInfoRepository.updateAccountIdByMemberId(account, subject);
    }


    @Transactional
    public void transfer(String token, String to, Long amount) {

        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo sender = memberInfoRepository.findMemberInfoByMemberId(subject);
        if(sender == null) throw new UserNotFoundException();

        MemberInfo receiver = memberInfoRepository.findMemberInfoByMemberId(to);
        if(receiver == null) throw new UserNotFoundException();

        Account senderAccount = accountRepository.findById(sender.getAccountId());;
        Account receiverAccount = accountRepository.findById(receiver.getAccountId());

        accountRepository.subBalanceByAccountNumber(amount, senderAccount.getAccountNumber());
        accountRepository.addBalanceByAccountNumber(amount, receiverAccount.getAccountNumber());

        transferHistoryRepository.save(new TransferHistory(null,sender.getAccountId(), receiver.getAccountId(), amount, senderAccount.getBalance() - amount,receiverAccount.getBalance() + amount,LocalDateTime.now(), LocalDateTime.now()));

    }


    @Transactional(readOnly = true)
    public List<TransferHistoryResponseDto> getTransferHistory(String token, Long page, Long size) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        if(memberInfo == null) throw new UserNotFoundException();


        List<TransferHistory> transferHistoryList = transferHistoryRepository.findByAccountNumber(memberInfo.getAccountId(), page, size);
        List<TransferHistoryResponseDto> transferHistoryResponseDtoList = new ArrayList<>();

        for(TransferHistory history : transferHistoryList)   {
            MemberInfo to;
            TransferHistoryResponseDto transferHistoryResponseDto;
            String sender = memberInfoRepository.findByAccountId(history.getSender()).getMemberId();
            if(sender.equals(memberInfo.getMemberId())) {
                to = memberInfoRepository.findByAccountId(history.getReceiver());
                transferHistoryResponseDto = new TransferHistoryResponseDto(history.getId(), to.getNickname(), history.getAmount(), history.getSenderBalance(), history.getCreatedDate(), (byte) 1);
            }
            else {
                to = memberInfoRepository.findByAccountId(history.getSender());
                transferHistoryResponseDto = new TransferHistoryResponseDto(history.getId(), to.getNickname(), history.getAmount(), history.getReceiverBalance(),history.getCreatedDate(), (byte) 0);

            }
            transferHistoryResponseDtoList.add(transferHistoryResponseDto);
        }

        return transferHistoryResponseDtoList;
    }


    @Transactional
    public void createBand(CreateBandDto createBandDto, String token) throws IOException {

        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        LocalDateTime currentTime = LocalDateTime.now();
        if(memberInfo == null)
            throw new UserNotFoundException();

        String filedSave = fileUtil.fileSave(createBandDto.getBandImage(), "png");
        Band band = new Band(null,createBandDto.getTitle(), createBandDto.getCategory(),filedSave, createAccount(), memberInfo.getMemberId(),LocalDateTime.now(), LocalDateTime.now());
        bandRepository.save(band);
        BandMember bandMember = new BandMember(band.getId(), subject, true, currentTime, currentTime);
        bandMemberRepository.save(bandMember);



//



    }
    @Transactional
    public void createMeeting(CreateMeetingDto createMeetingDto, String token) {
        String subject = jwtUtil.getSubject(token.substring(7));
        // 일정 추가 -> 메소드 따로 뻄

        List<LocalDateTime> days =  createMeetingDto.getDays();
        LocalDateTime currentTime = LocalDateTime.now();
        List<String> memberList = createMeetingDto.getMember();
        memberList.add(subject);
        for(LocalDateTime day : days) {
            LocalDateTime mergedDate = day.withHour(createMeetingDto.getTime().getHour() + 9).withMinute(createMeetingDto.getTime().getMinute());
            Meeting meeting = new Meeting(null, mergedDate, createMeetingDto.getAmount(), createMeetingDto.getBandId(),createMeetingDto.getLocationName(), createMeetingDto.getLatitude(), createMeetingDto.getLongitude(), currentTime, currentTime);
            meetingRepository.save(meeting);
            Long meetingId = meeting.getId();

            for(String member : memberList) {
                MeetingMember meetingMember = new MeetingMember(meetingId, member, subject.equals(member) ? createMeetingDto.getAmount() : 0L, currentTime, currentTime);
                meetingMemberRepository.save(meetingMember);
            }

        }
    }
    /*

    status = 0 참여 안함 그룹
    status = 1 참여하고 있는 그룹
    status = 2 참여 신청 보낸 그룹
     */
    @Transactional(readOnly = true)
    public List<BandSearchResponseDto> searchBand(String word, Long page, Long size, String token) {

        String subject = jwtUtil.getSubject(token.substring(7));

        List<BandSearchResponseDto> result = new ArrayList<>();
        List<Band> bandList = bandRepository.findByTitleContaining(word, page, size);
        for(Band band : bandList) {
            Byte status = 0;
            List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(band.getId());
            Apply apply = applyRepository.findById(band.getId(),subject);

            for(BandMember bandMember : bandMembers){
                if (bandMember.getMemberId().equals(subject)) {
                    status = 1;
                    break;
                }
            }

            if(apply != null) {
                status = 2;
            }


            result.add(new BandSearchResponseDto(band.getId(),band.getTitle(),convertCategoryEngToKor(band), band.getThumbnail(), status));
        }

        return result;
    }

    @Transactional(readOnly = true)
    public List<BandUserSearchResponseDto> searchUser(Long bandId, String word, Long page, Long size, String token) {

        String subject = jwtUtil.getSubject(token.substring(7));
        List<MemberInfo> memberInfoList = memberInfoRepository.findByMemberIdContainingWord(word, page, size);
        List<BandUserSearchResponseDto> memberSearchResponseDtoList = new ArrayList<>();

        for(MemberInfo memberInfo : memberInfoList) {
            if(!memberInfo.getMemberId().equals(subject)) {
                Byte status = 0;
                List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(bandId);
                for(BandMember bandMember : bandMembers) {
                    if(bandMember.getMemberId().equals(memberInfo.getMemberId())) {
                        status = 1;
                        if(!bandMember.getInvitationStatus()){
                            status = 2;
                        }
                    }
                }
                memberSearchResponseDtoList.add(new BandUserSearchResponseDto(memberInfo.getNickname(), memberInfo.getMemberId(), memberInfo.getProfileImage(), memberInfo.getAccountId(),status));
            }
        }

        return memberSearchResponseDtoList;

    }


    @Transactional(readOnly = true)
    public List<BandUserSearchResponseDto> searchUserParticipating(Long bandId, String word, Long page, Long size, String token) {

        String subject = jwtUtil.getSubject(token.substring(7));
        List<BandUserSearchResponseDto> memberSearchResponseDtoList = new ArrayList<>();


        List<BandMember> bandMembers = bandMemberRepository.findAllByBandIdAndMemberInfoNicknameContainingWordAndInvitationStatus(bandId, word ,true, page, size);
        for(BandMember bandMember : bandMembers) {

            if(!bandMember.getMemberId().equals(subject)) {
                MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(bandMember.getMemberId());
                memberSearchResponseDtoList.add(new BandUserSearchResponseDto(memberInfo.getNickname(), memberInfo.getMemberId(), memberInfo.getProfileImage(), memberInfo.getAccountId(), Byte.valueOf("1")));
            }

        }

        return memberSearchResponseDtoList;

    }







    @Transactional
    public void applyBand(Long bandId, String token) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        Band band = bandRepository.findById(bandId);
        applyRepository.save(new Apply(subject, bandId, LocalDateTime.now(), LocalDateTime.now()));

        saveNotification(memberInfo.getNickname() + "님이 " + band.getTitle() + "에 가입 신청을 했습니다.", band.getOwner(), memberInfo.getProfileImage(), null, bandId, false);
    }
    @Transactional
    public List<ApplyListResponseDto> getAllApplyList(Long bandId, Long page, Long size) {

        List<ApplyListResponseDto> result = new ArrayList<>();
        List<Apply> applyList = applyRepository.findAllByBandId(bandId, page ,size);
        Band band = bandRepository.findById(bandId);
        for(Apply apply : applyList){
            MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(apply.getMemberId());
            result.add(new ApplyListResponseDto(bandId,apply.getMemberId(), memberInfo.getNickname(), memberInfo.getProfileImage(), apply.getCreatedDate()));
        }
        return result;
    }
    @Transactional
    public void replyApply(Boolean reply, Long bandId, String memberId) {
        // 수락
        if(reply) {
            bandMemberRepository.save(new BandMember(bandId, memberId, true, LocalDateTime.now(), LocalDateTime.now()));
            List<Meeting> meetingList = meetingRepository.findAllByBandIdMeetingDayAfterNow(bandId);

            for(Meeting meeting: meetingList) {
                meetingMemberRepository.save(new MeetingMember(meeting.getId(), memberId, 0L, LocalDateTime.now(), LocalDateTime.now()));
            }
        }
        applyRepository.deleteById(bandId, memberId);

    }


    @Transactional(readOnly = true)
    public BandStatusResponseDto getBandStatus(Long bandId, String token) {
        String subject = jwtUtil.getSubject(token.substring(7));

        Band band = bandRepository.findById(bandId);
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(band.getOwner());
        List<BandMember> bandMemberList = bandMemberRepository.findAllByBandId(bandId);
        for(BandMember bandMember : bandMemberList){
            if(bandMember.getMemberId().equals(subject) && bandMember.getInvitationStatus()) {
                throw new AlreadyAcceptInvitationException();
            }
        }


        return new BandStatusResponseDto(band.getTitle(), band.getOwner(), memberInfo.getNickname(), memberInfo.getProfileImage(), convertCategoryEngToKor(band));

    }

    private String convertCategoryEngToKor(Band band) {
        String category = null;
        switch (band.getCategory()) {
            case "study":
                category ="스터디";
                break;
            case "sports":
                category ="스포츠";
                break;
            case "school":
                category ="학교, 동아리";
                break;
            case "hobby":
                category ="취미";
                break;
            case "company":
                category ="회사";
                break;
            case "etc":
                category ="기타";
                break;
        }

        return category;
    }

    @Transactional
    public void sendInvitation(InvitationDto invitationDto, String token) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        Band band = bandRepository.findById(invitationDto.getBandId());


        LocalDateTime currentTime = LocalDateTime.now();

        for(String member : invitationDto.getMembers()) {
            BandMember bandMember = new BandMember(invitationDto.getBandId(), member, subject.equals(member), currentTime, currentTime);
            bandMemberRepository.save(bandMember);
        }


        for(String member : invitationDto.getMembers()) {
            if(!member.equals(subject)){
                saveNotification(memberInfo.getNickname() + "님이 그룹 " + band.getTitle() + "에 초대하였습니다.", member, band.getThumbnail(), null, band.getId(), true);
            }
        }
    }

    // 생성됨 멤버 수락
    @Transactional
    public void replyInvitation(String token, Long bandId, Boolean answer) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);

        if(memberInfo == null)
            throw new UserNotFoundException();

        bandMemberRepository.updateInvitationStatusByBandIdAndMemberId(memberInfo.getMemberId(), bandId, answer);

    }

    // 모임 목록 조회

    public List<BandResponseDto> getBandList(String token, Long page, Long size) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);

        if(memberInfo == null)
            throw new UserNotFoundException();

        List<Band> bandList = bandRepository.findByBandMemberMemberIdInvitationStatus(memberInfo.getMemberId(), true, page, size);

        List<BandResponseDto> bandListResponseDto = new ArrayList<>();

        for(Band band : bandList) {
            List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(band.getId());
            List<MemberProfile> memberProfileList = new ArrayList<>();

            for(BandMember bandMember : bandMembers) {
                MemberInfo memberInfo1 = memberInfoRepository.findMemberInfoByMemberId(bandMember.getMemberId());
                memberProfileList.add(new MemberProfile(memberInfo1.getMemberId(),memberInfo1.getNickname(), memberInfo1.getProfileImage(), bandMember.getInvitationStatus(), band.getOwner().equals(memberInfo1.getMemberId())));
            }
            memberProfileList.sort(
                    Comparator.comparing(MemberProfile::getOwner).reversed() // isOwner를 기준으로 내림차순 정렬
                            .thenComparing(MemberProfile::getNickname) // nickname을 기준으로 내림차순 정렬
            );


            bandListResponseDto.add(new BandResponseDto(band.getId(),band.getTitle(),convertCategoryEngToKor(band), band.getThumbnail(), memberProfileList ));

        }

        return bandListResponseDto;
    }

    @Transactional
    public BandResponseDto getBand(Long bandId) {
        Band band = bandRepository.findById(bandId);


        List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(band.getId());
        List<MemberProfile> memberProfileList = new ArrayList<>();

        for(BandMember bandMember : bandMembers) {
            MemberInfo memberInfo1 = memberInfoRepository.findMemberInfoByMemberId(bandMember.getMemberId());
            memberProfileList.add(new MemberProfile(memberInfo1.getMemberId(),memberInfo1.getNickname(), memberInfo1.getProfileImage(), bandMember.getInvitationStatus(), band.getOwner().equals(memberInfo1.getMemberId())));
        }
        memberProfileList.sort(
                Comparator.comparing(MemberProfile::getOwner).reversed() // isOwner를 기준으로 내림차순 정렬
                        .thenComparing(MemberProfile::getNickname) // nickname을 기준으로 내림차순 정렬
        );



        return new BandResponseDto(band.getId(),band.getTitle(),convertCategoryEngToKor(band), band.getThumbnail(), memberProfileList );

    }





    @Transactional
    public void saveNotification(String message, String memberId,String profileImage, Long dutchPayId, Long bandId, Boolean invitation) {
        Notification notification = new Notification(null, message, memberId, profileImage, dutchPayId, bandId,invitation, LocalDateTime.now(), LocalDateTime.now());
        notificationRepository.save(notification);
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(memberId);
        firebaseMessagingService.sendMessage(memberInfo.getNotificationToken(), "하나모여", message);

    }

    @Transactional(readOnly = true)
    public List<NotificationResponseDto> getNotification(String token, Long page, Long size) {
        String subject = jwtUtil.getSubject(token.substring(7));
        List<Notification> notificationList = notificationRepository.findByMemberId(subject, page, size);
        List<NotificationResponseDto> notificationResponseDtoList = new ArrayList<>();

        for(Notification notification : notificationList) {
            notificationResponseDtoList.add( new NotificationResponseDto(notification.getId(), notification.getMessage(), notification.getMemberId(), notification.getProfileImage(),notification.getDutchPayId(), notification.getBandId(),notification.getInvitation() ,notification.getCreatedDate()));
        }

        return notificationResponseDtoList;
    }

    @Transactional(readOnly = true)
    public List<MeetingListDto> getAllMeetingList(String token, Long page, Long size) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);

        if(memberInfo == null)
            throw new UserNotFoundException();

        List<MeetingListDto> meetingListDtoList = new ArrayList<>();



        List<Meeting> meetingList = meetingRepository.findByMeetingMemberMemberIdAndBandMemberStatus(subject, true, page, size);

        for(Meeting meeting : meetingList) {
            Band band = bandRepository.findById(meeting.getBandId());
            String title = band.getTitle();
            List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(band.getId());

            List<MemberInfo> memberInfos = memberInfoRepository.findByMeetingMemberMeetingId(meeting.getId());
            List<MemberProfile> memberProfileList = new ArrayList<>();
            for(MemberInfo m : memberInfos) {
                memberProfileList.add(new MemberProfile(m.getMemberId(),m.getNickname(), m.getProfileImage(),isAcceptInvitation(bandMembers, m.getMemberId()), band.getOwner().equals(m.getMemberId())));
            }
            meetingListDtoList.add(new MeetingListDto(meeting.getId(), title, meeting.getLocationName(), meeting.getLatitude(), meeting.getLongitude(), meeting.getMeetingDay(), band.getVirtualAccountNumber(),memberProfileList, meeting.getAmount()));

        }

        return meetingListDtoList;

    }


    @Transactional(readOnly = true)
    public List<MeetingListDto> getMeetingList(String token, Long page, Long size, Long bandId) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);

        if(memberInfo == null)
            throw new UserNotFoundException();

        List<MeetingListDto> meetingListDtoList = new ArrayList<>();


        List<Meeting> meetingList = meetingRepository.findAllByBandIdMeetingDayAfterNowPage(bandId, page, size);

        for(Meeting meeting : meetingList) {
            Band band = bandRepository.findById(meeting.getBandId());
            String title = band.getTitle();
            List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(band.getId());

            List<MemberInfo> memberInfos = memberInfoRepository.findByMeetingMemberMeetingId(meeting.getId());
            try {
                List<MemberProfile> memberProfileList = new ArrayList<>();
                for(MemberInfo m : memberInfos) {
                    memberProfileList.add(new MemberProfile(m.getMemberId(),m.getNickname(), m.getProfileImage(),isAcceptInvitation(bandMembers, m.getMemberId()), band.getOwner().equals(m.getMemberId())));
                }
                meetingListDtoList.add(new MeetingListDto(meeting.getId(), title, meeting.getLocationName(),meeting.getLatitude(), meeting.getLongitude(), meeting.getMeetingDay(), band.getVirtualAccountNumber(),memberProfileList, meeting.getAmount()));

            }
             catch (Exception ex) {
                            ex.printStackTrace();
            }
        }

        return meetingListDtoList;

    }
    @Transactional(readOnly = true)
    public List<MeetingListDto> getMeetingHistory(Long bandId, Long page, Long size) {

        List<MeetingListDto> meetingListDtoList = new ArrayList<>();

        List<Meeting> meetingList = meetingRepository.findByBandIdMeetingDayBeforeNow(bandId, page, size);


        for(Meeting meeting : meetingList) {
            Band band = bandRepository.findById(meeting.getBandId());
            String title = band.getTitle();
            List<BandMember> bandMembers = bandMemberRepository.findAllByBandId(band.getId());

            List<MemberInfo> memberInfos = memberInfoRepository.findByMeetingMemberMeetingId(meeting.getId());
            List<MemberProfile> memberProfileList = new ArrayList<>();
            for(MemberInfo m : memberInfos) {
                memberProfileList.add(new MemberProfile(m.getMemberId(),m.getNickname(), m.getProfileImage(),isAcceptInvitation(bandMembers, m.getMemberId()), band.getOwner().equals(m.getMemberId())));
            }
            meetingListDtoList.add(new MeetingListDto(meeting.getId(), title, meeting.getLocationName(), meeting.getLatitude(), meeting.getLongitude(), meeting.getMeetingDay(),band.getVirtualAccountNumber() ,memberProfileList, meeting.getAmount()));

        }

        return meetingListDtoList;

    }
    @Transactional
    public void payMeeting(Long meetingId, String token) {
        String subject = jwtUtil.getSubject(token.substring(7));

        Meeting meeting = meetingRepository.findById(meetingId);
        Band band = bandRepository.findById(meeting.getBandId());
        List<MeetingMember> memberList = meetingMemberRepository.findByMeetingId(meetingId);

        for(MeetingMember meetingMember : memberList) {
            if(meetingMember.getMemberId().equals(subject)) {
                meetingMemberRepository.updatePayedAmountByMeetingIdAndMemberId(meeting.getAmount(), meetingId, subject);
            }
        }

        transfer(token, band.getOwner(), meeting.getAmount());
    }

    @Transactional(readOnly = true)
    public List<PayStatusDto> getMeetingPayStatus(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId);

        List<MeetingMember> meetingMemberList = meetingMemberRepository.findByMeetingId(meetingId);

        List<PayStatusDto> result = new ArrayList<>();
        for(MeetingMember meetingMember : meetingMemberList) {

            MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(meetingMember.getMemberId());

            result.add(new PayStatusDto(meetingMember.getMemberId(), memberInfo.getNickname(), memberInfo.getProfileImage(), meetingMember.getPayedAmount().equals(meeting.getAmount())));

        }

        return result;

    }
    @Transactional
    public void createPost(PostCreateDto postCreateDto, String token) throws IOException {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);
        if(memberInfo == null) throw new UserNotFoundException();

        Post post = new Post(null, postCreateDto.getBandId(), subject, postCreateDto.getContent(), LocalDateTime.now(), LocalDateTime.now());
        postRepository.save(post);
        int videoCnt = 0;
        if(postCreateDto.getMediaFiles() != null) {

            for(MultipartFile media : postCreateDto.getMediaFiles()) {
                String ext = media.getContentType().startsWith("video")? "mp4" : "png";
                String name = fileUtil.fileSave(media, ext);
                Long size = media.getSize();
                Media media1 = new Media(null, name, size, ext, post.getId(), LocalDateTime.now(), LocalDateTime.now());
                mediaRepository.save(media1);

                if(ext.equals("mp4")) {
                    MultipartFile thumbnail = postCreateDto.getThumbnailFiles().get(videoCnt);
                    String thumbnailName = fileUtil.fileSave(thumbnail, "png");
                    Long thumbnailSize = thumbnail.getSize();
                    thumbnailRepository.save(new Thumbnail(null, thumbnailName, thumbnailSize,"png", media1.getId(), LocalDateTime.now(), LocalDateTime.now()));
                    videoCnt++;
                }

            }
        }
    }
    @Transactional(readOnly = true)
    public List<PostResponseDto> getPosts(Long bandId, Long page, Long size) {
        List<PostResponseDto> result = new ArrayList<>();

        List<Post> postList = postRepository.findByBandIdOrderByCreatedDate(bandId, page, size);
        for(Post post : postList) {
            MemberInfo writer = memberInfoRepository.findMemberInfoByMemberId(post.getMemberId());

            List<Media> mediaList = mediaRepository.findAllByPostId(post.getId());
            List<String> mList = new ArrayList<>();
            for(Media media : mediaList) {
                mList.add(media.getName());
            }

            Long replyCount = replyRepository.countCommentByPostId(post.getId());

            result.add(new PostResponseDto(post.getId(), post.getMemberId(), writer.getNickname(), writer.getProfileImage(), post.getContent(), mList, replyCount, post.getCreatedDate()));
        }

        return result;
    }


    @Transactional(readOnly = true)
    public byte[] getImage(String fileName) throws IOException {
        String ext = fileName.substring(fileName.length() - 3);
        if(ext.equals("png")) {
            return fileUtil.getImage(fileName);
        }
        Media media = mediaRepository.findByName(fileName);
        Thumbnail thumbnail = thumbnailRepository.findByMediaId(media.getId());
        return fileUtil.getImage(thumbnail.getName());
    }

    public ResourceRegion getVideo(String watch, HttpHeaders headers) throws IOException {
        return fileUtil.getResourceRegion(watch, headers);
    }

    @Transactional
    public Long writeReply(ReplyCreateDto replyCreateDto, String token) {
        String subject = jwtUtil.getSubject(token.substring(7));
        MemberInfo memberInfo = memberInfoRepository.findMemberInfoByMemberId(subject);

        if(memberInfo == null) throw new UserNotFoundException();
        Reply reply = new Reply(null, replyCreateDto.getContent(), replyCreateDto.getReReplyId(), replyCreateDto.getPostId(), subject, LocalDateTime.now(), LocalDateTime.now());

        replyRepository.save(reply);

        // 알림 추가

        return reply.getId();

    }
    @Transactional(readOnly = true)
    public List<ReplyListResponseDto> getReply(Long postId, Long page, Long size) {
        List<ReplyListResponseDto> result = new ArrayList<>();


        List<Reply> replyList = replyRepository.findByPostIdAndReReplyIsNullOrderByCreatedDateAsc(postId, page, size);


        for(Reply reply : replyList) {
            MemberInfo writer = memberInfoRepository.findMemberInfoByMemberId(reply.getMemberId());
            Long cnt = replyRepository.countCommentByReReply(reply.getId());

            result.add(new ReplyListResponseDto(reply.getId(), reply.getReReply(), reply.getContent(), writer.getMemberId(), writer.getNickname(), writer.getProfileImage(), cnt, reply.getCreatedDate()));
        }

        return result;
    }

    @Transactional(readOnly = true)
    public List<ReplyListResponseDto> getReReply (Long postId, Long replyId, Long page, Long size) {
        List<ReplyListResponseDto> result = new ArrayList<>();
        List<Reply> reReplyList = replyRepository.findByPostIdAndReReplyOrderByCreatedDateAsc(postId, replyId, page, size);

        for(Reply reReply : reReplyList) {
            MemberInfo writer = memberInfoRepository.findMemberInfoByMemberId(reReply.getMemberId());
            Long cnt = replyRepository.countCommentByReReply(reReply.getId());

            result.add(new ReplyListResponseDto(reReply.getId(), reReply.getReReply(), reReply.getContent(), writer.getMemberId(), writer.getNickname(), writer.getProfileImage(), cnt, reReply.getCreatedDate()));
        }

        return result;

    }


    private Boolean isAcceptInvitation(List<BandMember> bandMemberList, String memberId) {
        for(BandMember bandMember : bandMemberList) {
            if(bandMember.getMemberId().equals(memberId)) {
                return bandMember.getInvitationStatus();
            }
        }
        throw new UserNotFoundException();
    }

    private String convertRegularDaysToNumber(List<String> days) {
        StringBuilder stringBuilder = new StringBuilder();

        for(String day : days) {
            switch (day) {
                case "mon":
                    stringBuilder.append('0');
                    break;
                case "tue":
                    stringBuilder.append('1');
                    break;
                case "wed":
                    stringBuilder.append('2');
                    break;
                case "thu":
                    stringBuilder.append('3');
                    break;
                case "fri":
                    stringBuilder.append('4');
                    break;
                case "sat":
                    stringBuilder.append('5');
                    break;
                case "sun":
                    stringBuilder.append('6');
            }
        }
        return stringBuilder.toString();
    }


    private List<LocalDateTime> getDatesForSelectedDays(LocalDateTime startDate, List<String> selectedDays) {
        List<LocalDateTime> result = new ArrayList<>();
        List<DayOfWeek> selectedDayOfWeeks = new ArrayList<>();

        for (String day : selectedDays) {
            switch (day.toLowerCase()) {
                case "mon":
                    selectedDayOfWeeks.add(DayOfWeek.MONDAY);
                    break;
                case "tue":
                    selectedDayOfWeeks.add(DayOfWeek.TUESDAY);
                    break;
                case "wed":
                    selectedDayOfWeeks.add(DayOfWeek.WEDNESDAY);
                    break;
                case "thu":
                    selectedDayOfWeeks.add(DayOfWeek.THURSDAY);
                    break;
                case "fri":
                    selectedDayOfWeeks.add(DayOfWeek.FRIDAY);
                    break;
                case "sat":
                    selectedDayOfWeeks.add(DayOfWeek.SATURDAY);
                    break;
                case "sun":
                    selectedDayOfWeeks.add(DayOfWeek.SUNDAY);
                    break;
            }
        }

        for (int i = 0; i < 28; i++) {
            LocalDateTime currentDate = startDate.plusDays(i);
            if (selectedDayOfWeeks.contains(currentDate.getDayOfWeek())) {
                result.add(currentDate);
            }
        }

        return result;
    }

    private String getDayOfWeek(LocalDateTime dateTime) {
        return dateTime.getDayOfWeek().getDisplayName(TextStyle.FULL, Locale.ENGLISH).toUpperCase();
    }

}
