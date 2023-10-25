package com.kopo.hanaGatherBackend.core;

import com.kopo.hanaGatherBackend.core.dto.*;
import com.kopo.hanaGatherBackend.core.service.CoreService;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/core")
@RestController
public class CoreController {
    private final CoreService coreService;

    public CoreController(CoreService coreService) {
        this.coreService = coreService;
    }


    @PostMapping("/profile/account/create")
    public MakeAccountDto createAccount() {
        return coreService.makeAccount();
    }

    @PostMapping("/profile/account/connect")
    public void connectAccount(@RequestHeader("Authorization") String token, @RequestParam String account) {
        coreService.connectAccount(token, account);
    }


    @PostMapping("/transfer")
    public void transfer(@RequestHeader("Authorization") String token, @RequestParam("to") String to, @RequestParam("amount") Long amount){
        coreService.transfer(token, to, amount);
    }

    @PostMapping("/transfer/history")
    public List<TransferHistoryResponseDto> getTransferHistory(@RequestHeader("Authorization") String token, @RequestParam("page") Long page, @RequestParam("size") Long size) {
        return coreService.getTransferHistory(token, page, size);
    }


    @PostMapping("/dutchpay")
    public Long requestDutchPay(@RequestBody DutchPayDto dutchPayRequestDto) {
        return coreService.requestDutchPay(dutchPayRequestDto);
    }

    @PostMapping("/dutchpay/status")
    public DutchPayStatusDto getDutchPayStatus(@RequestParam("dutchPayId") Long dutchPayId) {
        return coreService.getDutchPayStatus(dutchPayId);
    }
    @PostMapping("/dutchpay/pay")
    public void pay(@RequestBody PayDto payRequestDto, @RequestHeader("Authorization") String token) {
        coreService.pay(payRequestDto, token);
    }

    @PostMapping("/notification")
    public List<NotificationResponseDto> getNotification(@RequestParam Long page, @RequestParam Long size, @RequestHeader("Authorization") String token) {
        return coreService.getNotification(token, page, size);
    }
    @PostMapping("/home/profile")
    public HomeProfileResponseDto getHomeProfile(@RequestHeader("Authorization") String token) {
        return coreService.getHomeProfile(token);
    }
    @PostMapping("/home/dutchpay/list")
    public List<DutchPayListResponseDto> getDutchpayList(@RequestHeader("Authorization") String token, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getDutchPayList(token, page, size);
    }
    @PostMapping("/home/dutchpay/list/vertical")
    public List<DutchPayListVerticalResponseDto> getDutchpayListVertical(@RequestHeader("Authorization") String token, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getDutchPayListVertical(token, page, size);
    }

    @PostMapping("/band")
    public BandResponseDto getBand(@RequestParam Long bandId) {
        return coreService.getBand(bandId);
    }

    @PostMapping("/band/list")
    public List<BandResponseDto> getBandList(@RequestHeader("Authorization") String token, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getBandList(token, page, size);
    }
    @PostMapping(value = "/band/create", consumes= MediaType.MULTIPART_FORM_DATA_VALUE)
    public void creatBand(@ModelAttribute CreateBandDto createBandDto, @RequestHeader("Authorization") String token) throws IOException {
        coreService.createBand(createBandDto, token);
    }

    @PostMapping("/band/post/create")
    public void createPost(@RequestParam("content") String content, @RequestPart(value = "mediaFiles",  required = false)List<MultipartFile> mediaFiles, @RequestPart(value = "thumbnailFiles", required = false) List<MultipartFile> thumbnailFiles,@RequestParam("bandId") Long bandId ,@RequestHeader("Authorization") String token) throws IOException {
        coreService.createPost(new PostCreateDto(content, mediaFiles, thumbnailFiles, bandId), token);
    }

    @PostMapping("/band/post/list")
    public List<PostResponseDto> getPosts(@RequestParam Long bandId, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getPosts(bandId, page, size);
    }

    @PostMapping("/band/post/reply/list")
    public List<ReplyListResponseDto> getReply(@RequestParam Long postId, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getReply(postId, page, size);
    }

    @PostMapping("/band/post/reply/re/list")
    public List<ReplyListResponseDto> getReReply(@RequestParam Long postId,@RequestParam Long replyId, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getReReply(postId, replyId, page, size);
    }

    @PostMapping("/band/post/reply/create")
    public Long writeReply(@RequestBody ReplyCreateDto replyCreateDto, @RequestHeader("Authorization") String token) {
        return coreService.writeReply(replyCreateDto, token);
    }



    @PostMapping("/band/status")
    public BandStatusResponseDto getBandStatus(@RequestParam Long bandId, @RequestHeader("Authorization") String token) {
        return coreService.getBandStatus(bandId, token);
    }

    @PostMapping("/band/apply")
    public void applyBand(@RequestParam Long bandId, @RequestHeader("Authorization") String token) {
        coreService.applyBand(bandId, token);
    }

    @PostMapping("/band/apply/list")
    public List<ApplyListResponseDto> getAllApllyList(@RequestParam Long bandId, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getAllApplyList(bandId, page, size);
    }

    @PostMapping("/band/apply/reply")
    public void replyApply(@RequestParam Boolean reply, @RequestParam Long bandId,@RequestParam String memberId) {
        coreService.replyApply(reply, bandId, memberId);
    }

    @PostMapping("/band/search")
    public List<BandSearchResponseDto> searchBand(@RequestParam String word, @RequestParam Long page, @RequestParam Long size, @RequestHeader("Authorization") String token) {
        return coreService.searchBand(word,page, size, token);
    }

    @PostMapping("/band/search/user")
    public List<BandUserSearchResponseDto> searchBandUser(@RequestParam Long bandId, @RequestParam String word, @RequestParam Long page, @RequestParam Long size, @RequestHeader("Authorization") String token) {
        return coreService.searchUser(bandId,word,page, size, token);
    }

    @PostMapping("/band/search/user/participating")
    public List<BandUserSearchResponseDto> searchBandUserParticipating(@RequestParam Long bandId, @RequestParam String word, @RequestParam Long page, @RequestParam Long size, @RequestHeader("Authorization") String token) {
        return coreService.searchUserParticipating(bandId,word,page, size, token);
    }

    @PostMapping("/band/invitation")
    public void sendInvitation(@RequestBody InvitationDto invitationDto, @RequestHeader("Authorization") String token) {
        coreService.sendInvitation(invitationDto,token);
    }
    @PostMapping("/band/invitation/reply")
    public void replyInvitation(@RequestParam Long bandId, @RequestParam Boolean answer, @RequestHeader("Authorization") String token) {
        coreService.replyInvitation(token, bandId, answer);
    }

    @PostMapping("/meeting/create")
    public void createMeeting(@RequestBody CreateMeetingDto createMeetingDto, @RequestHeader("Authorization") String token) {
        coreService.createMeeting(createMeetingDto, token);
    }

    @PostMapping("/meeting/all")
    public List<MeetingListDto> getAllMeetingList(@RequestHeader("Authorization") String token, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getAllMeetingList(token, page, size);
    }

    @PostMapping("/meeting/list")
    public List<MeetingListDto> getMeetingList(@RequestHeader("Authorization") String token,@RequestParam Long bandId, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getMeetingList(token,page, size, bandId);
    }

    @PostMapping("/meeting/history")
    public List<MeetingListDto> getMeetingHistory(@RequestParam Long bandId, @RequestParam Long page, @RequestParam Long size) {
        return coreService.getMeetingHistory(bandId, page, size);
    }

    @PostMapping("/meeting/pay")
    public void payMeeting(@RequestParam Long meetingId, @RequestHeader("Authorization") String token) {
        coreService.payMeeting(meetingId, token);
    }

    @PostMapping("/meeting/pay/status")
    public List<PayStatusDto> getMeetingPayStatus(@RequestParam Long meetingId) {
        return coreService.getMeetingPayStatus(meetingId);

    }

    @GetMapping("/image")
    public byte[] getImage(@RequestParam String watch) throws IOException {
        return coreService.getImage(watch);
    }

    @GetMapping("/streaming")
    public ResponseEntity<ResourceRegion> streaming(@RequestParam String watch, @RequestHeader HttpHeaders headers) throws IOException {
        return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).contentType(MediaType.parseMediaType("video/mp4")).body(coreService.getVideo(watch, headers));
    }


}
