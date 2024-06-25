/*
Kode program ini bertujuan untuk mengatur interaksi pengguna pada halaman web portofolio.

1. PageTransition:
   - Fungsi ini mengatur transisi antar halaman ketika tombol navigasi diklik. Setiap kali tombol diklik, kelas 'active-btn' akan dipindahkan ke tombol yang aktif, dan konten yang sesuai dengan ID yang terkait dengan tombol tersebut akan ditampilkan.
   - Fungsi ini juga mengatur tema tampilan dengan mengganti 'light-mode' pada elemen body ketika tombol tema diklik, memungkinkan perubahan tema dari gelap ke terang atau sebaliknya.

2. Fetch Manifest:
   - Fungsi ini mengambil data dari file 'manifest.json' menggunakan fetch API. Data yang diambil meliputi nama dan deskripsi aplikasi yang kemudian ditampilkan di konsol.
   - Jika terjadi kesalahan dalam pengambilan data, pesan kesalahan akan ditampilkan di konsol.

Fungsi-fungsi ini membantu dalam membuat halaman web yang interaktif dan responsif terhadap aksi pengguna, serta memudahkan pengelolaan tema visual halaman.
*/


const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');

function PageTransition(){
    for(let i=0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function() {
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        })
    }
    
    allSections.addEventListener('click', (e) =>{
        const id = e.target.dataset.id;
        if(id){
            sectBtns.forEach((btn) =>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            sections.forEach((section)=>{
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () => {
        let element = document.body;
        element.classList.toggle('light-mode');
    })

}

PageTransition();

fetch('manifest.json')
  .then(response => response.json())
  .then(data => {
    console.log('Nama aplikasi:', data.name);
    console.log('Deskripsi:', data.description);
  })
  .catch(error => {
    console.error('Gagal mengambil manifest:', error);
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

