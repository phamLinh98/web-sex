Life Cycle ?

- Với component trong ReactJS thì LF chia làm 3 phase

* Mouting: được tạo ra, được kẹp vô trong Dom -> được hiển thị lên UI, render lần đầu
  mouting chỉ diễn ra đúng 1 lần
  --->DidMount --> call API or logic khều data --> tác dụng tương tự useEffect
* Updating: Qua nhiều thay đổi, diễn ra nhiều lần, mỗi khi prop or state thay đổi or cố tình gọi ForceUpdate
  sẽ trigger lại hàm render -> componentDidUpdate --> hạn chế dùng -->--> tác dụng tương tự useEffect
* Unmouting: Huỷ bỏ , bỏ ra khỏi Dom -> move ra khỏi UI, cũng chỉ diễn ra đúng 1 lần
  -->Clear timeout or interval
  --> reset data redux
  --> tác dụng tương tự useEffect
  chỉ nên dùng constructor , Didmount và Unmount, hạn chế dùng Didupdate(dễ bị vòng lăjp vô tận)
