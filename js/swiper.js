const swiper = new Swiper(".swiper", {
	// ページネーション
	pagination: {
		el: ".swiper-pagination" ,
		type: "fraction" /* この行を追加 */
	},
	// ナビボタン
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
	}
});