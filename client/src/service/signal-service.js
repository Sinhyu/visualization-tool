import { HTTP } from '@/http-common'

const nodeToName = {
  553802930: '흥도초교후문네거리',
  553803035: '흥도초교네거리',
  553803036: '도안12단지(단)(23-2번)',
  553803102: '목원대네거리',
  553803311: '도안12단지삼거리',
  553803314: '흥도초교(단)(23-1번)',
  553803323: '도안고교(단)',
  563100255: '덕고개삼거리',
  563100401: '장대2교네거리',
  563100609: '천양원(단)',
  563100818: '구암(단)',
  563100829: '유성고교(단)',
  563100863: '유성고네거리',
  563100898: '유성고삼거리',
  563100961: '유성고삼거리',
  563100992: '온천로삼거리',
  563101007: '리베라네거리',
  563101041: '월평1동사무소삼거리',
  563101074: '월평1동사무소삼거리',
  563101110: '월평초교삼거리',
  563101117: '구암역삼거리',
  563101189: '유성시장(단)',
  563101221: '장대푸르지오네거리',
  563101236: '궁동공영주차장삼거리',
  563101246: '미래부동산삼거리',
  563101269: '충대농대삼거리',
  563101270: '다솔APT삼거리',
  563101296: '유성구청네거리',
  563101330: '과기원(단)',
  563101573: '월평초교(단)',
  563101657: '노은농수산네거리',
  563101668: '장대신성APT네거리',
  563101676: '유성대교삼거리',
  563101677: '유성천삼거리',
  563102106: '장대초교(단)',
  563102181: '차량등록노은분소네거리',
  563102488: '오토월드(단)',
  563103266: '장터길네거리',
  563103340: '원신흥주민센터네거리',
  563103431: '유성중(단)',
  563103434: '도안목련네거리',
  563103595: '도안2단지(단)',
  563103606: '도안고교삼거리',
  563103607: '대전체고네거리',
  563103619: '대전체고(단)',
  563103625: '유성중삼거리',
  563103637: '도안6단지(단)',
  563103639: '도안9단지4(10번)',
  563103640: '상원삼거리(9-1,2)',
  563104210: '봉명초교(단)',
  563104262: '원신흥초교(단)',
  563105582: '패션월드삼거리',
  563106384: '죽동문화센터네거리',
  563106861: '도안5단지(단)',
  563106982: '도안9단지삼거리',
  563109555: '상대근린공원삼거리',
  cluster_553802684_553803129_553803237_553803348: '옥녀봉삼거리',
  cluster_553803225_553803226_553803398_553803621_553803622_553803623_553803624_553803625_553804565_553804566_553804567_553804568_553804569_553804570: '옥녀봉네거리',
  cluster_553803240_553803241_553803569_553803570_553803571_553803572_553803573_553803574_553803593_553803596_553805156_553805157_553807409_553807411_553807413_553807415_553807417_553807419: '도안네거리(24번)',
  cluster_553803342_553803343: '옥녀봉(단)',
  cluster_553803557_553803560_553803561_553803562_553807420_553807421: '도안28번네거리',
  cluster_553803564_553803566_553803579_553803580_553803581_553803582_553803597_553803598_553803599_553803600_553803601_553803602: '도안12단지네거리',
  cluster_553803565_553803567_553803575_553803576_553803577_553803578_553803677_553803678: '도안지하차도입구4',
  cluster_563100016_563103847_563109512_563109513: '유성고후문(단)(5-1번)',
  cluster_563100070_563100825: '구암어린이공원 네거리',
  cluster_563100071_563102845: '장대2교네거리',
  cluster_563100270_563100271_563101219_563101222_563101651_563101652_563101653_563102491: '장대삼거리',
  cluster_563100465_563100466_563100467_563100468_563100469_563100470_563101540_563101541_563102928_563109518_563109519: '온천교네거리',
  cluster_563100788_563103850_563103877_563103878_563103879_563103881_563103882_563103883_563104205: '구유성중삼거리(5-6번3)',
  cluster_563100866_563103911_563103912: '도안1단지(단)',
  cluster_563100878_563103320_563103322_563103323_563103324_563107114: '용반네거리',
  cluster_563100902_563101915: '휴양소삼거리',
  cluster_563100933_563105569_563105576_563105577: '월평삼거리',
  cluster_563101055_563101057_563101523_563101524_563101565_563101566: '유성온천네거리',
  cluster_563101113_563104606: '유성(단)',
  cluster_563101147_563101153: '홍인장(단)',
  cluster_563101180_563103195_563107828_563107830: '구암교네거리',
  cluster_563101247_563103427: '장대네거리',
  cluster_563101376_563101607_563101608_563105119: '죽동네거리',
  cluster_563101520_563101521_563101678_563101679_563102728_563102729_563102732_563102733_563102853_563103948_563103950_563103951_563108472_563108475_563108478_563108479: '1번 (유성네거리)',
  cluster_563101525_563101526_563101528_563101560_563101609_563101610_563108652_563108658_563108666_563108667_563108668_563108669: '충대정문오거리',
  cluster_563101532_563101533_563101555_563101556_563101557_563101558_563102842_563102844_563103316_563103317_563108710_563108711_563108713_563108716_563108725_563108726_563108728_563108730_563108731_563108732: '궁동네거리',
  cluster_563101537_563101538_563101539_563101552_563101553_563102862_563102906_563103418_563103419_563103420_563105139_563105140_563108484_563108485_563108486_563108488: '갑천대교네거리',
  cluster_563101569_563101570_563103157_563103160_563103161_563103211: '만년교네거리',
  cluster_563101661_563101662_563101663_563101686_563101690_563101691_563101692_563101698_563101700_563101701_563101702_563101703_563101704_563101711_563101712_563103122_563103123_563103285_563103772_563103773: '월드컵 네거리',
  cluster_563101671_563102856: '경하호텔삼거리',
  cluster_563101674_563102857: '삼보들삼거리',
  cluster_563101688_563101689_563101696_563101699_563102174_563102175_563102583_563102584_563103284_563103770_563103771_563103778_563104556: '노은주유소네거리',
  cluster_563101947_563102903_563102904_563102905: '과기원삼거리',
  cluster_563102154_563103845_563109514_563109515: '상대초교(단)',
  cluster_563102158_563107820: '장대(단)',
  cluster_563102992_563101350_563101356_563101360_563101656_563101658_563101659_563102991_563103217_563103438_563103439_563104228_563107313_563107314: '유성IC 삼거리(네거리)',
  cluster_563103119_563106919_563107911: '도안2단지삼거리',
  cluster_563103319_563103832_563103861_563103862: '신흥들삼거리',
  cluster_563103430_563103601_563103853_563103854_563103855_563103884_563103885_563103893_563103946_563103947_563107941_563107942: '진터네거리',
  cluster_563103433_563103849_563103871_563103872_563103873_563103874_563103875_563104618: '인삼골네거리',
  cluster_563103437_563103890_563103913_563103914: '도안5단지네거리',
  cluster_563103475_563103833_563103866: '원신흥삼거리',
  cluster_563103476_563103477_563103812_563103813_563103814_563103815_563103816_563103817_563103820_563103821: '상대네거리',
  cluster_563103599_563103904_563103905_563103906: '도안1단지네거리',
  cluster_563103603_563103838_563103839_563103840_563103841_563103867_563103868_563103869_563103892_563104463_563104464_563105592_563109526_563109527: '계룡대교네거리',
  cluster_563103641_563103889_563103894_563103895: '원골네거리',
  cluster_563103888_563103891: '원골(단)',
  cluster_563103909_563103910_563103954_563103955: '도안7단지(단)',
  cluster_563103956_563103957_563109522_563109523: '원신흥(단)',
  cluster_563105584_563105585_563105586_563106234_563106235_563106237_563106238_563106239_563106240_563106242_563106243: '도시철도공사네거리',
  cluster_563106246_563106247: '월평(단)',
  cluster_563106858_563107319_563107320: '도안19단지삼거리',
  cluster_563108444_563108446_563108449_563108450_563108451_563108452_563108453_563108454: '충대서문네거리',
  cluster_563109510_563109511: '구암119안전센터삼거리'
}

async function toXml ({ json, from, to }) {
  // return HTTP.post('/salt/signal/xml', {
  return HTTP.post('/salt/v1/signal/jsontoxml', {
    json,
    from,
    to
  })
}

function nodeIdToName (nodeId) {
  return nodeToName[nodeId]
}

export default {
  toXml,
  nodeIdToName
}
