import authorInfo from "../dataProcess/authorInfo/authorInfo";
import CreateAboutContents from "./tabContents/createAboutContent";
import CreateInfoContent from "./tabContents/createInfoContent";
import CreateTagContent from "./tabContents/createTagContent";

export default function first(data, sdk, tagData) {
    console.log('first data: ', data);

    // 데이터 적용
    CreateInfoContent(data.modelNameKo, data.modelAddressKo, data.modelAddressEn, data.modelAddressUrl, data.modelReservationUrl);
    CreateTagContent(sdk, tagData);
    CreateAboutContents(data.modelNameKo);
    authorInfo(data.modelDescKo, data.modelDescEn, data.hotelNameKo, data.hotelNameEn, data.modelAirBnbPictureSrc, data.modelUniqueUrl);
}