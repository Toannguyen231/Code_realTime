import rankSat from '../anhRank/rank_sat.jpg';
import rankDong from '../anhRank/rank_dong.jpg';
import rankBac from '../anhRank/rank_bac.jpg';
import rankVang from '../anhRank/rank_vang.jpg';
import rankTinhAnh from '../anhRank/rank_tinh_anh.jpg';
import rankKimCuong from '../anhRank/rank_kim_cuong.jpg';
import rankThachDau from '../anhRank/rank_thach_dau.jpg';

const RANK_IMAGE_MAP = {
    'Sắt': rankSat,
    'Đồng': rankDong,
    'Bạc': rankBac,
    'Vàng': rankVang,
    'Tinh Anh': rankTinhAnh,
    'Kim Cương': rankKimCuong,
    'Thách Đấu': rankThachDau
};

export const getRankImage = (rank) => {
    if (!rank) return rankSat;
    
    // Normalizing text since there are encoding issues sometimes from API or static strings
    const str = String(rank).toLowerCase();
    
    if (str.includes('đồng') || str.includes('dong') || str.includes('?ng')) return rankDong;
    if (str.includes('bạc') || str.includes('bac') || str.includes('b?c')) return rankBac;
    if (str.includes('vàng') || str.includes('vang') || str.includes('va?ng')) return rankVang;
    if (str.includes('tinh anh')) return rankTinhAnh;
    if (str.includes('kim cương') || str.includes('kim cuong') || str.includes('c??ng')) return rankKimCuong;
    if (str.includes('thách đấu') || str.includes('thach dau') || str.includes('th?ch') || str.includes('?u')) return rankThachDau;
    
    return rankSat;
};

export const getAllRankImages = () => {
    return RANK_IMAGE_MAP;
};

export const getRankOrder = () => {
    return ['Sắt', 'Đồng', 'Bạc', 'Vàng', 'Tinh Anh', 'Kim Cương', 'Thách Đấu'];
};
