package com.ssafy.webrtc.domain.friend;

import com.ssafy.webrtc.domain.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "friend")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
// FIXME: 우선 Setter 열어두고 개발 추후 생성자로 변경 예정
@Setter
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fr_from_member", referencedColumnName = "member_id", nullable = false, updatable = false)
    private Member fromMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fr_to_member", referencedColumnName = "member_id", nullable = false, updatable = false)
    private Member toMember;

    @Column(name = "pending", columnDefinition = "boolean default false")
    private boolean pending;

    @Column(name = "is_friend", columnDefinition = "boolean default false")
    private boolean isFriend;


    public Friend(Member fromMember, Member toMember, boolean pending, boolean isFriend) {
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.pending = pending;
        this.isFriend = isFriend;
    }

    public static Friend of(Member fromMember, Member toMember, boolean pending, boolean isFriend) {
        return new Friend(fromMember,toMember,pending,isFriend);
    }

    public void allowFriend() {
        this.pending = false;
        this.isFriend = true;
    }


}
