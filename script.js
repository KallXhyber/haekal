/*
=================================================
SCRIPT.JS - APLIKASI LINKTREE V4.1 (FINAL)
=================================================
Fitur Baru:
- Integrasi Coloris (Advanced Color Picker)
- Tema Desain Total (Anime/Dark Mode)
- Tipe Link Baru: Thumbnail, Embed YouTube, Embed Spotify
- Fitur Ekstra: Banner, Verified Badge, Now Playing
- Kustomisasi Tombol (Miring, Bulat, Kotak)
- Wrapper .link-button-inner untuk tombol miring
=================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // === 0. [BARU] Inisialisasi Coloris ===
    Coloris.init();
    Coloris({
        theme: 'large',
        themeMode: 'dark', // Tema dark untuk color picker
        alpha: false,
        swatches: [
            '#f06292', '#7e57c2', '#a78bfa', '#38bdf8', '#06b6d4', '#10b981',
            '#ffffff', '#c0c5e0', '#9a9edb', '#3b3d5d', '#2A2C40', '#1F202E'
        ]
    });

    // === 1. DEFINISI ELEMEN DOM ===
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);

    // Halaman Utama
    const announcementBanner = $('#announcementBanner');
    const bannerText = $('#bannerText');
    const nowPlayingToggle = $('#nowPlayingToggle');
    const nowPlayingToast = $('#nowPlayingToast');
    const songTitle = $('#songTitle');
    const songArtist = $('#songArtist');
    const profilePic = $('#profilePic');
    const profileUsername = $('#profileUsername');
    const verifiedBadge = $('#verifiedBadge');
    const profileBio = $('#profileBio');
    const linksListContainer = $('#links-list-container');
    const socialIconsContainer = $('#social-icons-container');
    const newsletterForm = $('#newsletterForm');
    const copyUrlBtn = $('#copyUrlBtn');
    const openQrModalBtn = $('#openQrModalBtn');
    
    // Modal Utama
    const customizeBtn = $('#customizeBtn');
    const customizePanel = $('#customizePanel');
    const closeBtn = $('#closeBtn');
    const saveBtn = $('#saveBtn');
    const resetBtn = $('#resetBtn');
    const tabLinks = $$('.tab-link');
    const tabContents = $$('.tab-content');
    
    // Form Tab Konten
    const profilePicInput = $('#profilePicInput');
    const usernameInput = $('#usernameInput');
    const bioInput = $('#bioInput');
    const verifiedToggle = $('#verifiedToggle');
    const linkEditorList = $('#link-editor-list');
    const addNewLinkBtn = $('#addNewLinkBtn');

    // Form Tab Tampilan
    const fontSelect = $('#fontSelect');
    const bgColor1 = $('#bgColor1');
    const bgColor2 = $('#bgColor2');
    const bgImageUrl = $('#bgImageUrl');
    const textAlignSelect = $('#textAlignSelect');
    const usernameColor = $('#usernameColor');
    const bioColor = $('#bioColor');
    const btnStyleSelect = $('#btnStyleSelect');
    const btnBgColor = $('#btnBgColor');
    const btnTextColor = $('#btnTextColor');
    const btnRadiusSelect = $('#btnRadiusSelect'); // [UPDATE V4.1]
    const profileShapeSelect = $('#profileShapeSelect');

    // Form Tab Ekstra
    const bannerTextInput = $('#bannerTextInput');
    const bannerToggle = $('#bannerToggle');
    const songTitleInput = $('#songTitleInput');
    const songArtistInput = $('#songArtistInput');
    const socialEditorList = $('#social-editor-list');
    const addNewSocialBtn = $('#addNewSocialBtn');
    const socialIconColor = $('#socialIconColor');
    const newsletterToggle = $('#newsletterToggle');

    // Modal Form Link V4
    const linkFormModalBackdrop = $('#link-form-modal-backdrop');
    const linkFormTitle = $('#link-form-title');
    const editingIndex = $('#editingIndex');
    const linkTypeSelect = $('#linkTypeSelect');
    const linkTitleInput = $('#linkTitleInput');
    const linkUrlInput = $('#linkUrlInput');
    const thumbnailUrlInput = $('#thumbnailUrlInput');
    const embedUrlInput = $('#embedUrlInput');
    const linkIconInput = $('#linkIconInput');
    const iconPreview = $('#iconPreview');
    const isFeaturedInput = $('#isFeaturedInput');
    const saveLinkBtn = $('#saveLinkBtn');
    const cancelLinkEditBtn = $('#cancelLinkEditBtn');
    const openIconPickerBtn = $('#openIconPickerBtn');
    const allLinkFields = $$('.link-field');

    // Modal Icon & QR
    const iconPickerModalBackdrop = $('#icon-picker-modal-backdrop');
    const closeIconPickerBtn = $('#closeIconPickerBtn');
    const iconGridContainer = $('#icon-grid-container');
    const iconSearchInput = $('#iconSearchInput');
    const qrCodeModalBackdrop = $('#qr-code-modal-backdrop');
    const qrCanvas = $('#qrCanvas');
    const qrUrlText = $('#qrUrlText');
    const closeQrModalBtn = $('#closeQrModalBtn');

    // === 2. DAFTAR IKON ===
    const iconList = [
        'fas fa-globe', 'fas fa-link', 'fas fa-store', 'fas fa-shopping-cart', 'fas fa-palette',
        'fas fa-blog', 'fas fa-file-alt', 'fas fa-video', 'fas fa-music', 'fas fa-camera',
        'fas fa-image', 'fas fa-envelope', 'fas fa-phone', 'fas fa-user', 'fas fa-briefcase',
        'fas fa-code', 'fab fa-github', 'fab fa-gitlab', 'fab fa-linkedin', 'fab fa-instagram', 
        'fab fa-facebook', 'fab fa-twitter', 'fab fa-youtube', 'fab fa-tiktok', 'fab fa-whatsapp', 
        'fab fa-telegram', 'fab fa-discord', 'fab fa-spotify', 'fab fa-paypal', 'fas fa-coffee', 
        'fas fa-heart', 'fas fa-star', 'fas fa-book', 'fas fa-graduation-cap', 'fas fa-calendar-alt',
        'fas fa-info-circle', 'fas fa-question-circle', 'fas fa-lightbulb', 'fas fa-fire',
        'fas fa-gamepad', 'fas fa-download', 'fas fa-share-alt', 'fas fa-rss', 'fas fa-podcast', 
        'fab fa-patreon', 'fab fa-twitch', 'fas fa-comment', 'fas fa-at', 'fas fa-hashtag',
        'fas fa-map-marker-alt', 'fas fa-building', 'fas fa-gift', 'fas fa-dollar-sign'
    ];

    // === 3. STATE APLIKASI V4.1 ===
    const defaultState = {
        profile: {
            pic: 'https://via.placeholder.com/150/7e57c2/FFFFFF?text=Foto',
            username: '@NamaAnda',
            bio: 'Ini adalah halaman link V4.1 Anime Gradient!',
            isVerified: true
        },
        links: [
            { type: 'standard', title: 'Website Utama', url: '#', icon: 'fas fa-globe', isFeatured: true },
            { type: 'thumbnail', title: 'Video Terbaru', url: '#', thumbnail: 'https://via.placeholder.com/50x50/f06292/FFFFFF?text=Vid' },
            { type: 'embed-yt', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
        ],
        socials: [
            { title: 'Instagram', url: '#', icon: 'fab fa-instagram' },
            { title: 'TikTok', url: '#', icon: 'fab fa-tiktok' },
            { title: 'YouTube', url: '#', icon: 'fab fa-youtube' }
        ],
        extras: {
            bannerText: 'Welcome to my Page! ✨',
            isBannerEnabled: true,
            songTitle: 'Idol',
            songArtist: 'YOASOBI',
            isNewsletterEnabled: true
        },
        theme: {
            font: "'Poppins', sans-serif",
            bgColor1: '#1F202E',
            bgColor2: '#1A1B26',
            bgImageUrl: '',
            textAlign: 'center',
            usernameColor: '#f06292',
            bioColor: '#c0c5e0',
            btnStyle: 'fill',
            btnBgColor: '#7e57c2',
            btnTextColor: '#ffffff',
            btnRadius: '12px', // [UPDATE V4.1] Default baru
            profileShape: '50%',
            socialIconColor: '#9a9edb'
        }
    };

    let appState;

    function saveState() {
        localStorage.setItem('premiumLinktreeStateV4', JSON.stringify(appState));
    }

    function loadState() {
        const savedState = localStorage.getItem('premiumLinktreeStateV4');
        appState = savedState ? JSON.parse(savedState) : JSON.parse(JSON.stringify(defaultState));
        appState.profile = { ...defaultState.profile, ...appState.profile };
        appState.links = appState.links || defaultState.links;
        appState.socials = appState.socials || defaultState.socials;
        appState.extras = { ...defaultState.extras, ...appState.extras };
        appState.theme = { ...defaultState.theme, ...appState.theme };
    }

    // === 4. FUNGSI RENDER (V4.1) ===

    function hexToRgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = "0x" + hex[1] + hex[1]; g = "0x" + hex[2] + hex[2]; b = "0x" + hex[3] + hex[3];
        } else if (hex.length == 7) {
            r = "0x" + hex[1] + hex[2]; g = "0x" + hex[3] + hex[4]; b = "0x" + hex[5] + hex[6];
        }
        return `${+r}, ${+g}, ${+b}`;
    }

    function applyTheme() {
        const root = document.documentElement;
        const theme = appState.theme;

        root.style.setProperty('--font-family', theme.font);
        root.style.setProperty('--text-align', theme.textAlign);
        root.style.setProperty('--color-username', theme.usernameColor);
        root.style.setProperty('--color-text', theme.bioColor);
        root.style.setProperty('--color-bg-start', theme.bgColor1);
        root.style.setProperty('--color-bg-end', theme.bgColor2);
        root.style.setProperty('--bg-image-url', theme.bgImageUrl ? `url(${theme.bgImageUrl})` : '');
        root.style.setProperty('--color-btn-bg', theme.btnBgColor);
        root.style.setProperty('--color-btn-text', theme.btnTextColor);
        root.style.setProperty('--btn-border-radius', theme.btnRadius); // [UPDATE V4.1]
        root.style.setProperty('--profile-border-radius', theme.profileShape);
        root.style.setProperty('--color-social-icon', theme.socialIconColor);
        root.style.setProperty('--color-btn-bg-rgb', hexToRgb(theme.btnBgColor));
        
        linksListContainer.className = 'links-container';
        linksListContainer.classList.add(`btn-style-${theme.btnStyle}`);
        
        newsletterForm.classList.toggle('show', appState.extras.isNewsletterEnabled);
    }
    
    function renderProfile() {
        profilePic.src = appState.profile.pic;
        profileUsername.textContent = appState.profile.username;
        profileBio.textContent = appState.profile.bio;
        verifiedBadge.classList.toggle('show', appState.profile.isVerified);
        
        bannerText.textContent = appState.extras.bannerText;
        announcementBanner.classList.toggle('show', appState.extras.isBannerEnabled);
        songTitle.textContent = appState.extras.songTitle || 'Musik Dimatikan';
        songArtist.textContent = appState.extras.songArtist || 'Klik 🎨 untuk set';
    }

    function getYouTubeEmbedUrl(url) {
        let videoId = '';
        if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1].split('?')[0];
        } else if (url.includes('watch?v=')) {
            videoId = url.split('watch?v=')[1].split('&')[0];
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    function getSpotifyEmbedUrl(url) {
        // [UPDATE V4.1] Regex lebih baik untuk semua tipe link Spotify
        const match = url.match(/https?:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
        if (match && match[1] && match[2]) {
            return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
        }
        // Fallback untuk link embed lama
        if (url.includes('embed.spotify.com')) {
            return url;
        }
        return ''; // Gagal
    }

    // [UPDATE V4.1] Fungsi renderLinks() diperbarui untuk .link-button-inner
    function renderLinks() {
        linksListContainer.innerHTML = '';
        appState.links.forEach((link) => {
            let itemEl;
            let innerContent; // [BARU]

            switch (link.type) {
                case 'thumbnail':
                    itemEl = document.createElement('a');
                    itemEl.href = link.url;
                    itemEl.className = 'link-button thumbnail-link';
                    itemEl.target = '_blank';
                    // Konten inner tidak perlu 'un-skew' karena thumbnail-link punya style sendiri
                    innerContent = `
                        <img src="${link.thumbnail}" alt="${link.title}" class="link-thumbnail">
                        <span>${link.title}</span>
                    `;
                    itemEl.innerHTML = innerContent;
                    if (link.isFeatured) itemEl.classList.add('featured');
                    break;
                
                case 'embed-yt':
                    itemEl = document.createElement('div');
                    itemEl.className = 'embed-container embed-youtube';
                    const ytUrl = getYouTubeEmbedUrl(link.url);
                    if(ytUrl) {
                        itemEl.innerHTML = `<iframe src="${ytUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    } else {
                        itemEl.innerHTML = `<p style="color:red; padding:10px;">URL YouTube tidak valid.</p>`;
                    }
                    break;

                case 'embed-spotify':
                    itemEl = document.createElement('div');
                    itemEl.className = 'embed-container embed-spotify';
                    const spUrl = getSpotifyEmbedUrl(link.url);
                    if(spUrl) {
                        itemEl.innerHTML = `<iframe src="${spUrl}" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
                    } else {
                        itemEl.innerHTML = `<p style="color:red; padding:10px;">URL Spotify tidak valid.</p>`;
                    }
                    break;

                case 'standard':
                default:
                    itemEl = document.createElement('a');
                    itemEl.href = link.url;
                    itemEl.className = 'link-button';
                    itemEl.target = '_blank';
                    // [UPDATE V4.1] Bungkus konten dengan .link-button-inner
                    innerContent = `
                        <div class="link-button-inner"> 
                            <i class="${link.icon || 'fas fa-link'}"></i>
                            <span>${link.title}</span>
                        </div>
                    `;
                    itemEl.innerHTML = innerContent;
                    if (link.isFeatured) itemEl.classList.add('featured');
                    break;
            }
            linksListContainer.appendChild(itemEl);
        });
    }

    function renderSocials() {
        socialIconsContainer.innerHTML = '';
        appState.socials.forEach((social) => {
            const socialEl = document.createElement('a');
            socialEl.href = social.url;
            socialEl.className = 'social-icon-link';
            socialEl.target = '_blank';
            socialEl.title = social.title;
            socialEl.innerHTML = `<i class="${social.icon || 'fas fa-globe'}"></i>`;
            socialIconsContainer.appendChild(socialEl);
        });
    }

    function renderListEditor(type) {
        const list = (type === 'link') ? appState.links : appState.socials;
        const container = (type === 'link') ? linkEditorList : socialEditorList;
        
        container.innerHTML = '';
        list.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'editor-item';
            itemEl.dataset.index = index;
            
            let icon, title, url;
            if(type === 'link') {
                icon = item.icon || 'fas fa-link';
                title = item.title || `Embed: ${item.type.split('-')[1]}`;
                url = item.url;
                if(item.type === 'thumbnail') icon = 'fas fa-image';
                if(item.type.includes('embed')) icon = (item.type === 'embed-yt') ? 'fab fa-youtube' : 'fab fa-spotify';
            } else {
                icon = item.icon;
                title = item.title;
                url = item.url;
            }

            itemEl.innerHTML = `
                <i class="fas fa-grip-vertical editor-item-grip"></i>
                <span class="editor-item-icon"><i class="${icon}"></i></span>
                <div class="editor-item-info">
                    <strong>${title}</strong>
                    <span>${url}</span>
                </div>
                <div class="editor-item-actions">
                    <button class="btn-edit-link" title="Edit" data-index="${index}" data-type="${type}"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn-delete-link" title="Hapus" data-index="${index}" data-type="${type}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            container.appendChild(itemEl);
        });
    }

    function loadModalForms() {
        // Tab Konten
        usernameInput.value = appState.profile.username;
        bioInput.value = appState.profile.bio;
        verifiedToggle.checked = appState.profile.isVerified;
        renderListEditor('link');
        
        // Tab Tampilan
        const theme = appState.theme;
        fontSelect.value = theme.font;
        bgColor1.value = theme.bgColor1;
        bgColor2.value = theme.bgColor2;
        bgImageUrl.value = theme.bgImageUrl;
        textAlignSelect.value = theme.textAlign;
        usernameColor.value = theme.usernameColor;
        bioColor.value = theme.bioColor;
        btnStyleSelect.value = theme.btnStyle;
        btnBgColor.value = theme.btnBgColor;
        btnTextColor.value = theme.btnTextColor;
        btnRadiusSelect.value = theme.btnRadius; // [UPDATE V4.1]
        profileShapeSelect.value = theme.profileShape;
        
        // Tab Ekstra
        const extras = appState.extras;
        bannerTextInput.value = extras.bannerText;
        bannerToggle.checked = extras.isBannerEnabled;
        songTitleInput.value = extras.songTitle;
        songArtistInput.value = extras.songArtist;
        renderListEditor('social');
        socialIconColor.value = theme.socialIconColor;
        newsletterToggle.checked = extras.isNewsletterEnabled;

        document.dispatchEvent(new Event('coloris:update', { bubbles: true }));
    }

    function renderAll() {
        applyTheme();
        renderProfile();
        renderLinks();
        renderSocials();
    }

    // === 5. LOGIKA MODAL & TAB ===
    customizeBtn.addEventListener('click', () => {
        loadModalForms();
        customizePanel.style.display = 'flex';
    });
    function closeModal() { customizePanel.style.display = 'none'; }
    closeBtn.addEventListener('click', closeModal);
    saveBtn.addEventListener('click', () => {
        saveState();
        alert('Perubahan disimpan!');
        closeModal();
    });
    resetBtn.addEventListener('click', () => {
        if (confirm('APAKAH ANDA YAKIN?\nSemua kustomisasi akan direset.')) {
            appState = JSON.parse(JSON.stringify(defaultState));
            saveState();
            renderAll();
            loadModalForms();
            alert('Reset berhasil!');
            closeModal();
        }
    });
    tabLinks.forEach(tab => {
        tab.addEventListener('click', () => {
            tabLinks.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            $(`#${tab.dataset.tab}`).classList.add('active');
        });
    });

    // === 6. LOGIKA LIVE PREVIEW KUSTOMISASI (V4.1) ===
    const liveUpdate = (obj, key, value) => {
        appState[obj][key] = value;
        if (obj === 'theme') applyTheme();
        else if (obj === 'profile' || obj === 'extras') renderProfile();
    };

    // Event Listeners (Tab Konten)
    usernameInput.addEventListener('input', (e) => liveUpdate('profile', 'username', e.target.value));
    bioInput.addEventListener('input', (e) => liveUpdate('profile', 'bio', e.target.value));
    verifiedToggle.addEventListener('change', (e) => liveUpdate('profile', 'isVerified', e.target.checked));
    
    // Event Listeners (Tab Tampilan)
    fontSelect.addEventListener('change', (e) => liveUpdate('theme', 'font', e.target.value));
    bgImageUrl.addEventListener('input', (e) => liveUpdate('theme', 'bgImageUrl', e.target.value));
    textAlignSelect.addEventListener('change', (e) => liveUpdate('theme', 'textAlign', e.target.value));
    btnStyleSelect.addEventListener('change', (e) => liveUpdate('theme', 'btnStyle', e.target.value));
    btnRadiusSelect.addEventListener('change', (e) => liveUpdate('theme', 'btnRadius', e.target.value)); // [UPDATE V4.1]
    profileShapeSelect.addEventListener('change', (e) => liveUpdate('theme', 'profileShape', e.target.value));

    // Event Listeners untuk Coloris
    document.addEventListener('input', (e) => {
        if (e.target.matches('[data-coloris]')) {
            const id = e.target.id;
            const value = e.target.value;
            switch (id) {
                case 'bgColor1': liveUpdate('theme', 'bgColor1', value); break;
                case 'bgColor2': liveUpdate('theme', 'bgColor2', value); break;
                case 'usernameColor': liveUpdate('theme', 'usernameColor', value); break;
                case 'bioColor': liveUpdate('theme', 'bioColor', value); break;
                case 'btnBgColor': liveUpdate('theme', 'btnBgColor', value); break;
                case 'btnTextColor': liveUpdate('theme', 'btnTextColor', value); break;
                case 'socialIconColor': liveUpdate('theme', 'socialIconColor', value); break;
            }
        }
    });
    
    // Event Listeners (Tab Ekstra)
    bannerTextInput.addEventListener('input', (e) => liveUpdate('extras', 'bannerText', e.target.value));
    bannerToggle.addEventListener('change', (e) => liveUpdate('extras', 'isBannerEnabled', e.target.checked));
    songTitleInput.addEventListener('input', (e) => liveUpdate('extras', 'songTitle', e.target.value));
    songArtistInput.addEventListener('input', (e) => liveUpdate('extras', 'songArtist', e.target.value));
    newsletterToggle.addEventListener('change', (e) => liveUpdate('extras', 'isNewsletterEnabled', e.target.checked));

    // Upload Foto Profil
    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => { liveUpdate('profile', 'pic', event.target.result); };
        reader.readAsDataURL(file);
    });

    // === 7. LOGIKA EDITOR LINK (SUPER MODAL V4) ===
    function updateLinkEditorForm() {
        const type = linkTypeSelect.value;
        allLinkFields.forEach(f => f.style.display = 'none');
        if (type === 'standard') {
            $('#field-linkTitle').style.display = 'block';
            $('#field-linkUrl').style.display = 'block';
            $('#field-iconPicker').style.display = 'block';
            $('#field-featured').style.display = 'flex';
        } else if (type === 'thumbnail') {
            $('#field-linkTitle').style.display = 'block';
            $('#field-linkUrl').style.display = 'block';
            $('#field-thumbnailUrl').style.display = 'block';
            $('#field-featured').style.display = 'flex';
        } else if (type === 'embed-yt' || type === 'embed-spotify') {
            $('#field-embedUrl').style.display = 'block';
        }
    }
    linkTypeSelect.addEventListener('change', updateLinkEditorForm);

    function openLinkEditor(index = -1) {
        editingIndex.value = index;
        if (index === -1) {
            linkFormTitle.textContent = 'Tambah Item Baru';
            linkTypeSelect.value = 'standard';
            linkTitleInput.value = ''; linkUrlInput.value = '';
            thumbnailUrlInput.value = ''; embedUrlInput.value = '';
            linkIconInput.value = 'fas fa-link';
            iconPreview.innerHTML = '<i class="fas fa-link"></i>';
            isFeaturedInput.checked = false;
        } else {
            const item = appState.links[index];
            linkFormTitle.textContent = 'Edit Item';
            linkTypeSelect.value = item.type;
            linkTitleInput.value = item.title || '';
            linkUrlInput.value = (item.type === 'embed-yt' || item.type === 'embed-spotify') ? '' : item.url;
            thumbnailUrlInput.value = item.thumbnail || '';
            embedUrlInput.value = (item.type === 'embed-yt' || item.type === 'embed-spotify') ? item.url : '';
            linkIconInput.value = item.icon || 'fas fa-link';
            iconPreview.innerHTML = `<i class="${item.icon || 'fas fa-link'}"></i>`;
            isFeaturedInput.checked = item.isFeatured || false;
        }
        updateLinkEditorForm();
        linkFormModalBackdrop.style.display = 'flex';
    }

    function openSocialEditor(index = -1) {
        editingIndex.value = index;
        const type = 'social';
        if(index === -1) {
            linkFormTitle.textContent = 'Tambah Ikon Sosial';
            linkTypeSelect.value = 'standard';
            linkTitleInput.value = ''; linkUrlInput.value = '';
            linkIconInput.value = 'fab fa-instagram';
            iconPreview.innerHTML = '<i class="fab fa-instagram"></i>';
        } else {
            const item = appState.socials[index];
            linkFormTitle.textContent = 'Edit Ikon Sosial';
            linkTypeSelect.value = 'standard';
            linkTitleInput.value = item.title;
            linkUrlInput.value = item.url;
            linkIconInput.value = item.icon;
            iconPreview.innerHTML = `<i class="${item.icon}"></i>`;
        }
        allLinkFields.forEach(f => f.style.display = 'none');
        $('#field-linkTitle').style.display = 'block';
        $('#field-linkUrl').style.display = 'block';
        $('#field-iconPicker').style.display = 'block';
        linkTypeSelect.style.display = 'none';
        editingType.value = type;
        linkFormModalBackdrop.style.display = 'flex';
    }

    addNewLinkBtn.addEventListener('click', () => openLinkEditor(-1));
    addNewSocialBtn.addEventListener('click', () => openSocialEditor(-1));

    [linkEditorList, socialEditorList].forEach(list => {
        list.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (!btn) return;
            const type = btn.dataset.type;
            const index = parseInt(btn.dataset.index);
            if (btn.classList.contains('btn-edit-link')) {
                if (type === 'link') openLinkEditor(index);
                else openSocialEditor(index);
            } else if (btn.classList.contains('btn-delete-link')) {
                deleteItem(type, index);
            }
        });
    });

    function deleteItem(type, index) {
        if (!confirm(`Yakin ingin menghapus item ini?`)) return;
        const list = (type === 'link') ? appState.links : appState.socials;
        list.splice(index, 1);
        renderListEditor(type);
        if (type === 'link') renderLinks(); else renderSocials();
    }

    saveLinkBtn.addEventListener('click', () => {
        const index = parseInt(editingIndex.value);
        const type = editingType.value;
        if (type === 'social') {
            const newItem = {
                title: linkTitleInput.value,
                url: linkUrlInput.value,
                icon: linkIconInput.value
            };
            if (index === -1) appState.socials.push(newItem);
            else appState.socials[index] = newItem;
            renderListEditor('social');
            renderSocials();
        } else {
            const linkType = linkTypeSelect.value;
            let newItem = { type: linkType };
            if (linkType === 'standard') {
                newItem.title = linkTitleInput.value;
                newItem.url = linkUrlInput.value;
                newItem.icon = linkIconInput.value;
                newItem.isFeatured = isFeaturedInput.checked;
            } else if (linkType === 'thumbnail') {
                newItem.title = linkTitleInput.value;
                newItem.url = linkUrlInput.value;
                newItem.thumbnail = thumbnailUrlInput.value;
                newItem.isFeatured = isFeaturedInput.checked;
            } else if (linkType === 'embed-yt' || linkType === 'embed-spotify') {
                newItem.url = embedUrlInput.value;
            }
            if (index === -1) appState.links.push(newItem);
            else appState.links[index] = newItem;
            renderListEditor('link');
            renderLinks();
        }
        linkFormModalBackdrop.style.display = 'none';
        editingType.value = '';
        linkTypeSelect.style.display = 'block';
    });
    cancelLinkEditBtn.addEventListener('click', () => {
        linkFormModalBackdrop.style.display = 'none';
        editingType.value = '';
        linkTypeSelect.style.display = 'block';
    });

    // === 8. LOGIKA ICON PICKER ===
    function renderIconPicker(filter = '') {
        iconGridContainer.innerHTML = '';
        const filteredIcons = iconList.filter(icon => icon.toLowerCase().includes(filter.toLowerCase()));
        if (filteredIcons.length === 0) iconGridContainer.innerHTML = '<p>Ikon tidak ditemukan.</p>';
        filteredIcons.forEach(iconClass => {
            const iconEl = document.createElement('i');
            iconEl.className = iconClass;
            iconEl.dataset.icon = iconClass;
            iconGridContainer.appendChild(iconEl);
        });
    }
    openIconPickerBtn.addEventListener('click', () => {
        renderIconPicker();
        iconPickerModalBackdrop.style.display = 'flex';
        iconSearchInput.focus();
    });
    closeIconPickerBtn.addEventListener('click', () => iconPickerModalBackdrop.style.display = 'none');
    iconSearchInput.addEventListener('input', (e) => renderIconPicker(e.target.value));
    iconGridContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'I') {
            const selectedIcon = e.target.dataset.icon;
            linkIconInput.value = selectedIcon;
            iconPreview.innerHTML = `<i class="${selectedIcon}"></i>`;
            iconPickerModalBackdrop.style.display = 'none';
        }
    });

    // === 9. LOGIKA DRAG-AND-DROP (Sortable.js) ===
    const initSortable = (el, type) => {
        new Sortable(el, {
            animation: 150, handle: '.editor-item-grip', ghostClass: 'sortable-ghost',
            onEnd: (evt) => {
                const list = (type === 'link') ? appState.links : appState.socials;
                const [movedItem] = list.splice(evt.oldIndex, 1);
                list.splice(evt.newIndex, 0, movedItem);
                renderListEditor(type);
                if (type === 'link') renderLinks(); else renderSocials();
            }
        });
    };
    initSortable(linkEditorList, 'link');
    initSortable(socialEditorList, 'social');

    // === 10. LOGIKA SHARE (Copy & QR) ===
    copyUrlBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => alert('Link halaman telah disalin!'));
    });
    openQrModalBtn.addEventListener('click', () => {
        qrUrlText.textContent = window.location.href;
        qrCodeModalBackdrop.style.display = 'flex';
        QRCode.toCanvas(qrCanvas, window.location.href, { width: 300, margin: 2 });
    });
    closeQrModalBtn.addEventListener('click', () => qrCodeModalBackdrop.style.display = 'none');

    // === 11. LOGIKA "NOW PLAYING" TOAST ===
    nowPlayingToggle.addEventListener('click', () => {
        nowPlayingToast.classList.toggle('show');
        if (nowPlayingToast.classList.contains('show')) {
            setTimeout(() => { nowPlayingToast.classList.remove('show'); }, 5000);
        }
    });
    
    // === 12. LOGIKA FORM NEWSLETTER ===
    newsletterForm.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type=email]').value;
        if (email) {
            alert(`Terima kasih!\nEmail ${email} telah didaftarkan.`);
            e.target.querySelector('input[type=email]').value = '';
        }
    });

    // === 13. INISIALISASI APLIKASI ===
    loadState();
    renderAll();
    saveState();
});