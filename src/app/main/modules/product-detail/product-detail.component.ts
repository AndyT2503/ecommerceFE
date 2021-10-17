import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(NzCarouselComponent, { static: false }) carousel!: NzCarouselComponent;

  sliderImages = [
    { src: 'assets/promotion/slider_1.png' },
    { src: 'assets/promotion/slider_2.png' },
    { src: 'assets/promotion/slider_3.png' },
    { src: 'assets/promotion/slider_4.png' },
    { src: 'assets/promotion/slider_5.png' },
  ];
  category: any;
  isDescriptionCollapsed = true;

  // TODO: Mockup Data
  htmlContent = `<div class="block-blog-content">
  <div class="blog-content__box-content">
  <div class="box-outstanding-features">
  <div class="box-title">
  <h2>ĐẶC ĐIỂM NỔI BẬT</h2>
  </div>
  <div class="box-content">
  <ul><li> Màn hình rõ nét, hiển thị tuyệt đẹp - Công nghệ Liquid Retina 10.9 inch</li><li> Hiệu suất đầu bảng, giải trí đỉnh cao - Vi xử lý A14 Bionic, RAM 4GB, loa kép chất lượng cao</li><li> Thiết kế hiện đại, bảo mật an toàn - Hợp kim nhôm cao cấp, màu sắc trẻ trung, touchID tích hợp nút nguồn tiện lợi</li><li> Đa tác vụ, hỗ trợ công việc dễ dàng - Kết nối phụ kiện Apple Pencil Gen 2, Magic Keyboard</li><li> Chụp ảnh chuyên nghiệp - Camera sau 12MP, hỗ trợ quay phim lên đén 4K</li><ul> </ul></ul></div>
  </div>
  <div class="blog-content">
  <h2><strong>iPad Air 4 2020 – Chip A14 mạnh mẽ cho trải nghiệm hoàn hảo</strong></h2>
  <p>Apple luôn khiến cho cộng đồng công nghệ đứng ngồi không yên mỗi khi cho giới thiệu sản phẩm mới. <strong>iPad Air 4</strong>&nbsp;được ra mắt tại sự kiện mà các tín đồ công nghệ nghĩ rằng Apple sẽ trình làng dòng <a href="https://cellphones.com.vn/iphone-12.html">điện thoại iPhone 12 2020</a>,&nbsp;nhưng chiếc tablet này mới chính là nhân vật chính. iPad Air thế hệ 2020&nbsp;mang những thay đổi về mặt thiết kế cũng như những tính năng mới được tích hợp để tối ưu hóa về hiệu năng, mang đến cho người dùng những trải nghiệm tốt hơn.&nbsp;</p>
  <p>Ngoài ra, bạn cũng có thể tham khảo thêm <a href="https://cellphones.com.vn/ipad-air-5.html">iPad Air 5</a> sắp ra mắt dự kiến sẽ có nhiều nâng cấp ấn tượng.</p>
  <h3><strong>Thiết kế tinh tế, màu sắc thời thượng với độ mỏng 6.1mm </strong></h3>
  <p>Máy tính bảng iPad Air 2020 sẽ có thiết kế hoàn toàn mới với kiểu dáng tương tự với iPad Pro 2020 nhưng với kích thước nhỏ gọn hơn 247.6 x 178.5 mm và độ mỏng chỉ 6.1 mm cùng trọng lượng chưa đến 500g giúp bạn dễ dàng mang theo iPad để sử dụng ở bất cứ đâu.</p>
  <p>Thiết kế nguyên khối mang đến tổng thể sang trọng cho <a href="https://cellphones.com.vn/tablet/ipad-air.html">iPad Air</a> 4 cùng với gam màu mới thời thượng, nút home được loại bỏ để tạo nên không gian hiển thị rộng hơn.</p>
  <p><img class="cpslazy loaded" alt="Thiết kế tinh tế, màu sắc thời thượng với độ mỏng 5.9mm" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-1.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-1.jpg"></p>
  <p>Thiết kế của iPad Air 4 sẽ vuông vắn hơn so với những dòng iPad trước đây, các góc cạnh được bo tròn nhẹ nhàng để tạo cảm giác mềm mại hơn cho tổng thể.</p>
  <p><img class="cpslazy loaded" alt="Thiết kế của iPad Air 4 sẽ vuông vắn hơn so với những dòng iPad trước đây" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-3.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-3.jpg"></p>
  <h3><strong>Màn hình có tần số quét 60Hz, tấm nền IPS LCD và kích thước 10.9 inch</strong></h3>
  <p>Để mang đến không gian hiển thị tuyệt vời cho người dùng, Apple đã trang bị màn hình có tần số quét đến 60Hz cho iPad Air 4, giúp hình ảnh hiển thị mượt mà, các chuyển động hình ảnh trơn tru cũng như hạn chế tình trạng giật lag. Nhờ vậy bạn có thể tận hưởng những thước phim ấn tượng, chơi game (đặc biệt là những game có góc nhìn thứ nhất) một cách tuyệt vời nhất. Độ phân giải&nbsp;2360 x 1640 pixels cho hình ảnh sắc nét và chân thực.</p>
  <p><img class="cpslazy loaded" alt="Màn hình có tần số quét 120Hz, tấm nền IPS LCD và kích thước 11 inch" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-2.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-2.jpg"></p>
  <p>Sử dụng tấm nền IPS LCD cho iPad Air 10.9 cùng với công nghệ True-Tone cho khả năng tái tạo màu sắc chính xác, gần với thực tế hỗ trợ cho công việc chỉnh sửa ảnh, video,…hiệu quả hơn. Bên cạnh đó màn hình này còn sở hữu độ sáng 500 nits để hình ảnh luôn hiển thị tốt trong những điều kiện ánh sáng khác nhau, giúp bạn sử dụng iPad tốt ngay cả khi ở ngoài trời.</p>
  <h3><strong>Chip A14 kết hợp RAM 6GB cho sức mạnh ấn tượng và bộ nhớ 128GB lưu trữ rộng rãi</strong></h3>
  <p>Sức mạnh của máy đến từ con chip A14 Bionic để mang đến tốc độ xử lý vượt trội hơn, nhanh chóng hơn cùng với RAM 6GB cho sức mạnh không thua gì một chiếc PC. Bên cạnh đó còn có thông tin <strong>iPad Air 2020</strong> sẽ có bàn phím Magic Keyboard riêng để có thể giúp bạn biến chiếc máy tính bảng của mình thành một chiếc laptop một cách nhanh chóng và đơn giản.</p>
  <p><img class="cpslazy loaded" alt="Chip A12Z Bionic và RAM 6GB cho sức mạnh ấn tượng và bộ nhớ 128GB lưu trữ rộng rãi" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-5.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-5.jpg"></p>
  <p>Máy có bộ nhớ trong 128GB rộng rãi để bạn có thể lưu trữ được nhiều dữ liệu hơn, thoải mái cài đặt các ứng dụng, trò chơi phục vụ cho nhu cầu sử dụng của bạn.</p>
  <h3><strong>Hệ thống camera với cảm biến LiDAR hỗ trợ quay phim chất lượng 4K siêu nét</strong></h3>
  <p>Một trong những sự cải tiến mới của iPad Air 4 chính là hệ thống camera với camera chính góc rộng 12MP cùng với cảm biến chiều sâu TOF 3D LiDAR hỗ trợ quay phim với chất lượng 4K cho hình ảnh cực kỳ sắc nét và sinh động. Bên cạnh đó, iPad cũng được hỗ trợ những tính năng chụp ảnh thông minh như xóa phông, lấy nét tự động,…cho ảnh chụp không thua kém bất kỳ thiết bị nào.</p>
  <p><img class="cpslazy loaded" alt="Hệ thống camera với cảm biến LiDAR hỗ trợ quay phim chất lượng 4K siêu nét" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-4.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-4.jpg"></p>
  <p>Camera trước có cảm biến 7MP và hỗ trợ quay phim 1080p, hỗ trợ video call chất lượng cao mang đến những trải nghiệm tuyệt vời cho người dùng. Bạn có thể sử dụng iPad để quay lại vlog hằng ngày thay cho một chiếc máy quay, máy ảnh và chia sẻ ngay với bạn bè, người thân,…vô cùng tiện lợi.</p>
  <h3><strong>Dung lượng pin lớn cho 10 giờ lướt web</strong></h3>
  <p>Apple cũng đã nâng cấp dung lượng pin cho iPad Air 4 với dung lượng lớn, cho 10 giờ lướt web bằng wifi, 9 giờ sử dụng mạng di động. Mặc dù dung lượng trước đây của những thế hệ iPad trước cũng đã đáp ứng rất tốt về thời lượng sử dụng chính vì thế sự nâng cấp này chắc chắn sẽ giúp người dùng càng yên tâm hơn khi sử dụng thiết bị suốt cả ngày dài mà không lo hết pin.</p>
  <p><img class="cpslazy loaded" alt="Dung lượng pin 9720mAh tích hợp sạc nhanh 18W" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-6.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-6.jpg"></p>
  <p>Bên cạnh đó Apple cũng tích hợp công nghệ sạc nhanh 18W cho <strong>iPad Air 4</strong> để giúp người dùng có thể nạp năng lượng cho iPad nhanh chóng. Bạn có thể sử dụng thiết bị của bạn liên tục và nhanh nạp lại pin cho thiết bị, giải quyết nỗi lo lắng về pin iPad.</p>
  <h3><strong>Tính năng bảo mật cao, hỗ trợ đầy đủ các kết nối không dây và hỗ trợ kết nối 3G/4G</strong></h3>
  <p>Một trong những tính năng nổi bật của Apple chính là Touch ID trên nút nguồn. iPad Air 10.9 inch 2020 được tích hợp Touch ID sẽ giúp bảo mật an toàn hơn cho iPad, không lo bị lộ mật khẩu cũng như giúp bạn mở khóa iPad một cách nhanh chóng.</p>
  <p><img class="cpslazy loaded" alt="Tính năng FaceID bảo mật cao, hỗ trợ đầy đủ các kết nối không dây và hỗ trợ kết nối 3G/4G" data-src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-7_2.jpg" data-ll-status="loaded" src="https://cdn.cellphones.com.vn/media/wysiwyg/tablet/apple/ipad-air-4-7_2.jpg"></p>
  <p>Máy cũng hỗ trợ đầy đủ các kết nối như kết nối WiFi giúp bạn truy cập vào mạng Internet nhanh chóng. Ngoài ra còn có phiên bản iPad hỗ trợ 3G/4G (có khe lắp thẻ SIM) để bạn có thể luôn trực tuyến dù ở bất cứ đâu, không bỏ lỡ bất cứ thông báo, tin nhắn nào.</p>
  <h2><strong>Mua iPad Air 4 giá rẻ, hàng chính hãng, ưu đãi khủng tại CellphoneS</strong></h2>
  <p>Hiện chiếc tablet này&nbsp;đã được bán tại các cửa hàng của CellphoneS tại Hà Nội và TP.HCM vì vậy hãy nhanh chóng đến cửa hàng và sở hữu ngay cho mình một chiếc máy tính bảng<strong>&nbsp;iPad Air 4 2020</strong>&nbsp;chính hãng với mức giá tốt nhất cùng với những ưu đãi vô cùng hấp dẫn. Nếu bạn ở xa và muốn mua sản phẩm thì CellphoneS cũng hỗ trợ thanh toán online, giao hàng tận nơi miễn phí và thanh toán tận nơi, hỗ trợ bạn mua được sản phẩm một cách đơn giản.</p> </div>
  </div>
  </div>`;
  constructor() { }

  ngOnInit(): void {
  }

  selectCategory(index: number): void {
    this.category = index;
    this.carousel.goTo(index);
  }

}
