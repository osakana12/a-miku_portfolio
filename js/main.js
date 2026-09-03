//-------------index---------------
//----------ハンバーガー
(function () {
	const navToggle = document.getElementById('navToggle');
	const navMenu = document.getElementById('navMenu');
	const navBackdrop = document.getElementById('navBackdrop');
	if (!navToggle) return;

	function openMenu() {
		navToggle.classList.add('is-open');
		navMenu.classList.add('is-open');
		navBackdrop.classList.add('is-open');
		navToggle.setAttribute('aria-expanded', 'true');
		document.body.style.overflow = 'hidden';
	}
	function closeMenu() {
		navToggle.classList.remove('is-open');
		navMenu.classList.remove('is-open');
		navBackdrop.classList.remove('is-open');
		navToggle.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';
	}

	navToggle.addEventListener('click', () => {
		navToggle.classList.contains('is-open') ? closeMenu() : openMenu();
	});
	navBackdrop.addEventListener('click', closeMenu);
	navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();

//----------マウスストーカー
document.addEventListener("DOMContentLoaded", function () {
	const stalker = document.getElementById("js-stalker");
	const links = document.querySelectorAll("a, button");
	document.addEventListener("mousemove", function (e) {
		// マウスの座標を取得
		const x = e.clientX;
		const y = e.clientY;
		// ストーカーの位置を更新
		stalker.style.opacity = "1"; // カーソルが画面内に入ったら不透明にする
		stalker.style.transform = "translate(" + x + "px, " + y + "px)"; // マウスの座標に移動
	});
	links.forEach(function (link) {
		link.addEventListener("mouseenter", function () {
			stalker.classList.add("js-hover"); // リンクにカーソルが乗ったときに拡大するクラスを追加
		});
		link.addEventListener("mouseleave", function () {
			stalker.classList.remove("js-hover"); // リンクからカーソルが離れたときに拡大するクラスを削除
		});
	});
});

//----------H1タイトルアニメーション
(function () {
	const el = document.getElementById('animTitle');
	if (!el) return;
	const text = el.textContent;

	function play() {
		el.innerHTML = '';
		const chars = text.split('');
		chars.forEach((char, i) => {
			const span = document.createElement('span');
			span.textContent = char === ' ' ? '\u00A0' : char;
			span.className = 'char';
			span.style.animationDelay = `${i * 0.12}s`;//文字の出現スピード
			el.appendChild(span);
		});
		const totalTime = 20000; //(chars.length * 0.05 * 1000) + (1 * 1000) + 2500;//繰り返しまでの秒数(現在20秒)
		setTimeout(play, totalTime);//繰り返し再生しない場合はこの行を削除
	}
	play();
})();

//----------スクロールでふわっと表示
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
	entries.forEach(e => {
		if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
	});
}, { threshold: 0.1,
	rootMargin: "-20% 0px" // 画面の下端から20%上がった位置で発火
});
revealEls.forEach(el => io.observe(el));


//----------経歴アコーディオン
function toggleExpand(btn, id) {
	const wrap = document.getElementById(id);
	const isOpen = wrap.classList.toggle('open');
	btn.classList.toggle('is-open', isOpen);
	btn.querySelector('.more-btn-label').textContent = isOpen ? '閉じる' : '詳しくみる';
}


//-----------worksページ-----------

//カテゴリ振り分けボタン
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.works-card');

function applyFilter(f) {
	let i = 0;
	cards.forEach(card => {
		const match = (f === 'all' || card.dataset.cat === f);
		if (match) {
			card.classList.remove('is-hidden');
			card.classList.remove('card-pop');
			card.style.transitionDelay = (i * 100) + 'ms';
			//アニメーションが既に表示されている状態でも再開するように、強制的にリフロー（再レイアウト）を発生させる。
			void card.offsetWidth;
			requestAnimationFrame(() => card.classList.add('card-pop'));
			i++;
		} else {
			card.classList.add('is-hidden');
			card.classList.remove('card-pop');
			card.style.transitionDelay = '0ms';
		}
	});
}

filterBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		filterBtns.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
		applyFilter(btn.dataset.filter);
	});
});

// initial reveal on page load
applyFilter('all');

//-----------illustページ-----------
//----------差分自動切り替え
document.querySelectorAll('.thumb-crossfade').forEach(el => {
	const imgs = el.querySelectorAll('img');
	if (imgs.length < 2) return;
	let idx = [...imgs].findIndex(img => img.classList.contains('is-active'));
	if (idx === -1) idx = 0;

	setInterval(() => {
		imgs[idx].classList.remove('is-active');
		idx = (idx + 1) % imgs.length;
		imgs[idx].classList.add('is-active');
	}, 6000); // 6秒ごとに切り替え
});
