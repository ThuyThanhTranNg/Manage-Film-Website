import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import { getMovies, deleteMovie, updateMovie } from "../services/movieService";
// Dữ liệu phim tĩnh
const moviesData = [
  {
    id: 1,
    title: "Avengers",
    genre: "action",
    releaseDate: "2023",
    description: "Đội Avengers săn lùng tàn dư HYDRA và thu giữ cây trượng của Loki, bên trong là Viên đá Tâm trí. Tony Stark sử dụng cây trượng cho chương trình gìn giữ hòa bình Ultron mà anh tạo ra. Thế nhưng thử nghiệm này lại tạo ra một trí tuệ nhân tạo hung ác muốn thanh trừng cả thế giới. Ultron hợp tác với hai kẻ có siêu năng lực là Scarlet Witch và Quicksilver để thực hiện kế hoạch của mình.",
    image: "/images/actions/marvel1.jpg",
    videoUrl: "https://www.youtube.com/embed/oXIWoUoLoKg?si=IJjXn4kO9C4UuURb",
    subtitleUrl: "/subtitles/sub1.vtt",
    views: 500,
  },
  {
    id: 2,
    title: "Venom",
    genre: "action",
    releaseDate: "2018",
    description: "Venom (2018) là bộ phim siêu anh hùng của Hoa Kỳ được phát triển dựa trên nhân vật cùng tên của Marvel Comics, phim được sản xuất bởi hãng Columbia Pictures và Sony Pictures Releasing phát hành. Đây cũng là bộ phim đầu tiên lấy nhân vật từ vũ trụ Marvel của Sony, phim được hỗ trợ từ Marvel nhưng tách biệt khỏi MCU. Lấy bối cảnh San Francisco khi loài người đang cố gắng chống lại những căn bệnh quái ác, nhà khoa học Carlton Drake đã mở ra một hướng đi hoàn toàn mới, từ bỏ việc tìm kiếm trên mặt đất hay dưới đại dương, anh vươn tới vũ trụ bằng việc cho tàu ra không gian và mang về mẫu vật từ xa để kiếm tìm nguồn sống mới. Tuy vậy, dự án Life Foundation của anh lại vướng phải nhiều tin đồn nghiêm trọng.",
    image: "/images/actions/venom1.jpg",
    videoUrl: "https://www.youtube.com/embed/7RJKCugksiM?si=uSOcwBgYgTUYyIIa",
    subtitleUrl: "/subtitles/sub2.vtt",
    views: 750,
  },
  {
    id: 3,
    title: "Venom 3",
    genre: "action",
    releaseDate: "2021",
    description: "Venom 3 - là phần cuối trong loạt phim Venom tiếp nối câu chuyện của Eddie Brock và Venom sau khi họ trở về vũ trụ của mình từ chuyến du hành ngắn ngủi sang MCU trong Spider-Man: No Way Home (2021).  Lần này cặp đôi cộng sinh phải đối mặt với những thách thức mới khi bị săn đuổi bởi cả hai thế giới: loài người và đồng loại của Venom.Cụ thể hơn Eddie bị truy đuổi bởi một tổ chức bí ẩn muốn bắt giữ Venom để nghiên cứu, trong khi Venom phải đối đầu với một symbiote mới đến từ hành tinh của mình.  Mối quan hệ giữa Eddie và Venom cũng bị ảnh hưởng nặng nề bởi những biến cố này, đẩy họ đến đầy bi kịch.",
    image: "/images/actions/venom3.jpg",
    videoUrl: "https://www.youtube.com/embed/WCoztlkJL5I?si=mKrEKLDXGudhvJBB",
    subtitleUrl: "/subtitles/sub3.vtt",
    views: 1000,
  },
  {
    id: 4,
    title: "Venom 4",
    genre: "action",
    releaseDate: "2024",
    description: "Venom là một nhân vật hư cấu xuất hiện trong sách truyện tranh Mỹ, được phát hành bởi Marvel Comics, và thường kết hợp với người Nhện. Nhân vật này là một Symbiote ngoài hành tinh có hình dạng vô định, giống như chất lỏng, sống sót bằng cách cộng sinh với vật chủ, thường là con người. Dạng sống cộng sinh này sẽ giúp vật chủ nâng cao sức mạnh và thường được gọi là Venom",
    image: "/images/actions/venom4.jpg",
    videoUrl: "https://www.youtube.com/embed/23xDSXx3WV8?si=iBAMf1hNMBESlA47",
    subtitleUrl: "/subtitles/sub4.vtt",
    views: 1200,
  },
  {
    id: 5,
    title: "Thor",
    genre: "action",
    releaseDate: "2023",
    description: "Action-packed adventure!",
    image: "/images/actions/thor.webp",
    videoUrl: "https://www.youtube.com/embed/tGiYWwZ9WS8?si=XOAAl-grZ9brpwv9",
    subtitleUrl: "/subtitles/sub1.vtt",
    views: 500,
  },
  {
    id: 6,
    title: "Người Nhện Trở về nhà",
    genre: "action",
    releaseDate: "2022",
    description: "Vào thời điểm hiện tại, sau khi tham gia vào cuộc nội chiến của nhóm Avengers trong Captain America: Nội chiến siêu anh hùng, Peter Parker tiếp tục việc học của mình sau khi Stark nói với cậu rằng cậu chưa sẵn sàng để trở thành một thành viên của Avengers. Với sự phản đối của dì May, Peter đã rời khỏi đội Decathlon (đội tuyển học sinh giỏi quốc gia) của trường Midtown để cậu có thể tập trung vào Trại thực tập Stark, vốn là bình phong cho các hoạt động chống tội phạm của cậu trong vai Spider-Man.",
    image: "/images/actions/spider1.jpg",
    videoUrl: "https://www.youtube.com/embed/UmbM05RN3Lg?si=XGlPONic1SmZyEX2",
    subtitleUrl: "/subtitles/sub2.vtt",
    views: 750,
  },
  {
    id: 7,
    title: "Người Nhện: Không còn nhà",
    genre: "action",
    releaseDate: "2021",
    description: "Sau khi Quentin Beck buộc tội Peter Parker về tội giết người và tiết lộ danh tính của anh ta cho cả thế giới, dì của là May, MJ và Ned Leeds bị thẩm vấn, nhưng mọi cáo buộc đều được bãi bỏ với sự giúp đỡ của luật sư Matt Murdock. Parker, MJ và Ned nộp đơn vào MIT, nhưng đơn đăng ký bị từ chối do mối quan hệ của MJ và Ned với Người Nhện. Parker đến thăm Sanctum Sanctorum để nhờ phù thủy tối thượng, Stephen Strange, giúp đỡ, và Strange gợi ý một cổ thuật có thể khiến mọi người quên Peter Parker là Người Nhện. Tuy nhiên, trong khi Strange sử dụng câu thần chú, Parker liên tục yêu cầu thay đổi, khiến nó trở nên bị lỗi và khiến cho những người biết đến thân phận thật của Người Nhện ở những vũ trụ khác bị kéo đến dòng thời gian chính của vũ trụ MCU.",
    image: "/images/actions/spider2.jpg",
    videoUrl: "https://www.youtube.com/embed/Yq4n0upxFVg?si=uVVovIR85kmU8qb3",
    subtitleUrl: "/subtitles/sub3.vtt",
    views: 1000,
  },
  {
    id: 8,
    title: "WandaVision ",
    genre: "action",
    releaseDate: "2020",
    description: "Lấy bối cảnh ba tuần sau các sự kiện của Avengers: Hồi Kết (2019), Wanda Maximoff và Vision đang sống một cuộc sống ngoại ô bình dị ở thị trấn Westview, cố gắng che giấu sức mạnh của họ. Khi họ bắt đầu bước vào những thập kỷ mới và gặp phải những trò lố trên truyền hình, cặp đôi nghi ngờ rằng mọi thứ không như họ tưởng tượng.",
    image: "/images/actions/wandavision.webp",
    videoUrl: "https://www.youtube.com/embed/Qk6sHPC7Tmw?si=NDFFOTfNsomppNfC",
    subtitleUrl: "/subtitles/sub4.vtt",
    views: 1200,
  },
  {
    id: 9,
    title: "Chủng tộc bất tử ",
    genre: "action",
    releaseDate: "2023",
    description: "Eternals, một chủng tộc bất tử hùng mạnh do các Celestials tạo ra, được gửi xuống Trái Đất để dẫn dắt và bảo vệ loài người khỏi các Deviants - một chủng loài xấu xa, hiếu chiến và tham vọng, kẻ thù số một của các Eternals (nhưng chúng cùng loài người cũng được tạo ra bởi chính các Celestials). Từ hàng nghìn năm về trước, chủng loài Deviants đã luôn nung nấu dã tâm muốn xâm chiếm Trái Đất nhưng đều bị các Eternals quyền năng ngăn chặn. Và lần này, các Eternals sẽ phải tập hợp lại để một lần nữa cứu Trái Đất thoát khỏi sự diệt vong.",
    image: "/images/actions/battu.jpg",
    videoUrl: "https://www.youtube.com/embed/O3iVT0vbNmw?si=vJIEeBLhoVZ5BLwN",
    subtitleUrl: "/subtitles/sub1.vtt",
    views: 500,
  },
  {
    id: 10,
    title: "Phù thủy tối thượng trong Đa Vũ Trụ hỗn loạn",
    genre: "action",
    releaseDate: "2022",
    description: "Phù thủy tối thượng trong Đa Vũ Trụ hỗn loạn lấy bối cảnh vài tháng sau các sự kiện của Người Nhện: Không còn nhà. Elizabeth Olsen đóng vai Wanda Maximoff / Scarlet Witch, tiếp tục từ sự xuất hiện của cô trong loạt phim WandaVision (2021), với Julian Hilliard và Jett Klyne lần lượt thể hiện các phiên bản thay thế của hai con trai của Maximoff là Billy và Tommy. ",
    image: "/images/actions/phuthuy.jpg",
    videoUrl: "https://www.youtube.com/embed/os_4-jou0hk?si=123abXp5kwATCX6B",
    subtitleUrl: "/subtitles/sub2.vtt",
    views: 750,
  },
  {
    id: 11,
    title: "Chiến binh báo đen: Wakanda bất diệt",
    genre: "action",
    releaseDate: "2021",
    description: "Sau khi T'Challa qua đời do căn bệnh lạ, đất nước Wakanda đứng trước thách thức khi phải đối đầu với Talokan, một quốc gia dưới đại dương có thủ lĩnh là Namor - Thần Rắn có lông vũ. Cuộc tấn công của Talokan và sau cái chết của nữ hoàng Ramonda đã đưa Shuri tổng hợp lại thành công Tâm hình thảo và trở thành Chiến binh Báo đen, cùng với đội quân của mình trong việc giải cứu Riri Williams, cô và đội quân đánh bại Namor và hình thành liên minh hòa bình với Talokan.",
    image: "/images/actions/black.jpg",
    videoUrl: "https://www.youtube.com/embed/APwecL1rqwQ?si=vPr34Zoy8WSjaZV_",
    subtitleUrl: "/subtitles/sub3.vtt",
    views: 1000,
  },
  {
    id: 12,
    title: "Người Kiến và Chiến binh Ong: Thế giới Lượng tử",
    genre: "action",
    releaseDate: "2020",
    description: "Scott Lang (Ant-man) đã trở thành một tác giả thành công và sống hạnh phúc với bạn gái Hope van Dyne (The Wasp) sau các sự kiện trong Endgame. Con gái của Lang, Cassie, đã trở thành một nhà hoạt động xã hội khiến cô bị bắt và Lang phải bảo lãnh cho cô. Khi đến thăm cha mẹ của Hope, Hank Pym và Janet van Dyne, Cassie tiết lộ rằng cô ấy đang làm việc trên một thiết bị có thể liên lạc với Thế giới Lượng tử. Khi biết được điều này, Janet hoảng sợ và cố gắng tắt thiết bị, nhưng tin nhắn đã được nhận, dẫn đến một cánh cổng mở ra và kéo năm người họ vào Thế giới Lượng tử. Cha con Lang được tìm thấy bởi những người bản xứ đang nổi dậy chống lại kẻ thống trị của họ, trong khi Hope, Janet và Hank phải đi qua một thành phố rộng lớn để tìm câu trả lời.",
    image: "/images/actions/tg.png",
    videoUrl: "https://www.youtube.com/embed/w1z6WV7cbY0?si=sGLg6q2VRUFlRU3u",
    subtitleUrl: "/subtitles/sub4.vtt",
    views: 1200,
  },
  {
    id: 13,
    title: "Vệ binh dải Ngân Hà 3 ",
    genre: "action",
    releaseDate: "2023",
    description: "Sau khi mua Knowhere từ The Collector, đội Vệ binh biến nó thành nơi trú ẩn cho những người tị nạn trong vũ trụ hậu Cú búng tay của Thanos. Tuy nhiên, biến cố xảy ra khi Adam Warlock tấn công Rocket, khiến Peter Quill, lúc này vẫn đang quay cuồng vì mất Gamora, phải tập hợp cả đội để cứu lấy người bạn thân của mình và bảo vệ vũ trụ khỏi nhà khoa học điên High Evolutionary - người đã thí nghiệm lên Rocket và những sinh vật khác.",
    image: "/images/actions/vb.jpg",
    videoUrl: "https://www.youtube.com/embed/OsKHPnSUGWQ?si=hN6Iiv20KpqODtJr",
    subtitleUrl: "/subtitles/sub1.vtt",
    views: 500,
  },
  {
    id: 14,
    title: "Captain America: Trật tự thế giới mới",
    genre: "action",
    releaseDate: "2022",
    description: "Captain America: Thế Giới Mới (tiếng Anh: Captain America: Brave New World) là phim điện ảnh siêu anh hùng Mỹ sắp ra mắt dựa trên nhân vật Sam Wilson / Captain America của bộ truyện tranh Marvel Comics. Phim do hãng Marvel Studios sản xuất và được Walt Disney Studios Motion Pictures dự kiến phát hành năm 2025",
    image: "/images/actions/ct.jpg",
    videoUrl: "https://www.youtube.com/embed/45YkmSVLBrI?si=FNa6XPiE4MENoZ8a",
    subtitleUrl: "/subtitles/sub2.vtt",
    views: 750,
  },
  {
    id: 15,
    title: "Shang-Chi Và huyền thoại Thập Luân",
    genre: "action",
    releaseDate: "2021",
    description: "Hàng ngàn năm trước, Từ Văn Vũ (Mandarin) tìm thấy Thập Luân, mười vũ khí thần bí giúp người dùng bất tử và có sức mạnh to lớn. Văn Vũ tích lũy một đội quân chiến binh được gọi là Thập Luân Hội và chinh phục nhiều vương quốc và lật đổ các chính phủ trong suốt chiều dài lịch sử. Năm 1996, Văn Vũ bắt đầu tìm kiếm ngôi làng Đại La (大羅), nơi được cho là chứa nhiều linh thú, để mở rộng quyền lực của mình. Ông tìm thấy lối vào của ngôi làng, nhưng bị người giám hộ của làng, Ánh Lệ ngăn cản không cho vào. Hai người yêu nhau và có hai đứa con, đặt tên Shang-Chi (Thượng Khí) và Xialing (Hạ Linh). Văn Vũ từ bỏ Thập Luân Hội và tổ chức của mình để đến với gia đình. Tuy nhiên, Ánh Lệ đã bị sát hại bởi Gang Gang, đối thủ cũ của Thập Luân Hội, và Văn Vũ một lần nữa phục hồi Thập Luân Hội để tàn sát họ và tiếp tục các hoạt động tội phạm của mình. Shang-Chi bắt đầu tập luyện võ thuật và được Văn Vũ cử đi lúc 14 tuổi để ám sát thủ lĩnh của Gang Gang. ",
    image: "/images/actions/tl.jpg",
    videoUrl: "https://www.youtube.com/embed/HBdkIWdteSk?si=sTqV5pHNAo8f00ab",
    subtitleUrl: "/subtitles/sub3.vtt",
    views: 1000,
  },
  {
    id: 16,
    title: "Deadpool 3",
    genre: "action",
    releaseDate: "2024",
    description: " Quill trao danh hiệu đội trưởng của đội Vệ binh cho Rocket trước khi đến Trái đất và đoàn tụ với ông ngoại của mình. Mantis bắt đầu hành trình khám phá bản thân với Abilisk, trong khi Gamora đoàn tụ với Ravager. Còn Nebula và Drax ở lại Knowhere để nuôi nấng những đứa trẻ được giải cứu. Nhóm Vệ binh mới - Rocket, Groot, Cosmo, Kraglin, Warlock, Phyla và một sinh vật Blurp.",
    image: "/images/actions/ddp.jpg",
    videoUrl: "https://www.youtube.com/embed/9YNOKm-4kO4?si=7t5BeAcTPI1uD3BL",
    subtitleUrl: "/subtitles/sub4.vtt",
    views: 1200,
  },
  {
    id: 17,
    title: "Thunderbolts",
    genre: "action",
    releaseDate: "2023",
    description: "Marvel Studios hé lộ về việc thành lập nhóm Thunderbolts trong MCU vào năm 2021. Bộ phim tiết lộ được phát triển vào tháng 6 năm 2022, khi Schreier và Pearson tham gia đội ngũ làm phim. Dàn diễn viên chính của bộ phim đã được tiết lộ vào tháng 9, sau đó là tuyển diễn viên bổ sung đến đầu năm 2023. ",
    image: "/images/actions/ss.jpg",
    videoUrl: "https://www.youtube.com/embed/nzHYD6v1u58?si=r0Pd_BmNU-0jqpgM",
    subtitleUrl: "/subtitles/sub1.vtt",
    views: 500,
  },
  {
    id: 18,
    title: "Biệt đội Marvels",
    genre: "action",
    releaseDate: "2022",
    description: "Biệt đội Marvel (tên tiếng Anh: The Marvels) là phim siêu anh hùng dựa theo nhóm 3 nhân vật Carol Danvers / Captain Marvel, Kamala Khan / Ms. Marvel và Monica Rambeau của hãng truyện tranh Marvel Comics. Được sản xuất bởi Marvel Studios và được phân phối bởi Walt Disney Studios Motion Pictures, phim là phần hậu truyện của Đại uý Marvel (2019) và phim truyền hình Ms. Marvel (2022), và là phim thứ 33 của Vũ trụ Điện ảnh Marvel. Phim được đạo diễn bởi Nia DaCosta dựa theo kịch bản của Megan McDonnell, với dàn diễn viên bao gồm Brie Larson trong vai Carol Danvers, Iman Vellani trong vai Kamala Khan và Teyonah Parris trong vai Monica Rambeau.",
    image: "/images/actions/bd.png",
    videoUrl: "https://www.youtube.com/embed/iLa78XSjfAE?si=Y4YWJMCjc2LKUtLv",
    subtitleUrl: "/subtitles/sub2.vtt",
    views: 750,
  },
  {
    id: 19,
    title: "Người Sắt 2",
    genre: "action",
    releaseDate: "2021",
    description: "Để phản ứng hồ quang được duy trì năng lượng mạnh mẽ cho việc khởi động các bộ giáp, Tony phải dùng paladi, một kim loại độc hại đe dọa trực tiếp đến sức khỏe và tính mạng anh, để làm pin nhiên liệu. Lò phản ứng hồ quang gắn trước lồng ngực ngày một đe dọa tính mạng Tony. Anh đơn độc trước mọi thứ đang chống đối chính mình trong khi tính mạng của anh đang đếm trên từng cục pin.",
    image: "/images/actions/ir2.jpg",
    videoUrl: "https://www.youtube.com/embed/uq0E0qoZnnE?si=fx1f-BX8mtf2U-vj",
    subtitleUrl: "/subtitles/sub3.vtt",
    views: 1000,
  },
  {
    id: 20,
    title: "Người Sắt 3",
    genre: "action",
    releaseDate: "2020",
    description: "Câu chuyện bắt đầu bằng một ký ức của Tony Stark xảy ra vào đêm giao thừa năm 1999. Khi đó anh đang tham gia một hội nghị khoa học ở Zürich cùng với nhà khoa học Maya Hansen, tác giả của một công trình nghiên cứu có tên gọi Extremis (một huyết thanh thử nghiệm cho phép phục hồi các vết thương nhanh chóng dù là nặng nhất). Tại đây, họ gặp nhà khoa học khuyết tật Aldrich Killian. Killian đã mời cả hai người cùng đến nghiên cứu tại công ty A.I.M. Nhưng Stark đã làm ngơ khiến cho Killian cảm thấy vô cùng nhục nhã.",
    image: "/images/actions/ir3.jpg",
    videoUrl: "https://www.youtube.com/embed/E08HZqTppoE?si=2LB-dk7rm30kdFQJ",
    subtitleUrl: "/subtitles/sub4.vtt",
    views: 1200,
  },
];

const ActionPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const allMovies = getMovies();
    // Lọc phim thuộc thể loại Action
    const actionMovies = allMovies.filter((movie) => movie.genre === "action");
    setMovies(actionMovies);
  }, []);

  const handleDeleteMovie = (id) => {
    deleteMovie(id);
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleEditMovie = (updatedMovie) => {
    updateMovie(updatedMovie);
    setMovies(movies.map((movie) =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
  };

  return (
    <div>
      <h1>Action Movies</h1>
      <MovieList
        movies={movies}
        onDelete={handleDeleteMovie}
        onEdit={handleEditMovie}
      />
    </div>
  );
};

export default ActionPage;
