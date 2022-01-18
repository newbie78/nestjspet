/* eslint-disable @typescript-eslint/no-var-requires */
const covidApi = require('covid19-api');
import { Injectable } from '@nestjs/common';

import { getByCountryNameDto } from './dto/getByCountryName.dto';

const COUNTRIES_LIST = `
afghanistan, albania, algeria, andorra, angola, anguilla, antigua-and-barbuda, argentina, armenia, aruba, australia, austria, azerbaijan,
bahamas, bahrain, bangladesh, barbados, belarus, belgium, belize, benin, bermuda, bhutan, bolivia, bosnia-and-herzegovina, botswana, brazil, british-virgin-islands, brunei-darussalam, bulgaria, burkina-faso, burundi,
cabo-verde, cambodia, cameroon, canada, caribbean-netherlands, cayman-islands, central-african-republic, chad, channel-islands, chile, china, china-hong-kong-sar, china-macao-sar, colombia, congo, costa-rica, cote-d-ivoire, croatia, cuba, curacao, cyprus, czech-republic,
democratic-republic-of-the-congo, denmark, djibouti, dominica, dominican-republic,
ecuador, egypt, el-salvador, equatorial-guinea, eritrea, estonia, ethiopia,
faeroe-islands, falkland-islands-malvinas, fiji, finland, france, french-guiana, french-polynesia,
gabon, gambia, georgia, germany, ghana, gibraltar, greece, greenland, grenada, guadeloupe, guatemala, guinea, guinea-bissau, guyana,
haiti, holy-see, honduras, hungary,
iceland, india, indonesia, iran, iraq, ireland, isle-of-man, israel, italy,
jamaica, japan, jordan,
kazakhstan, kenya, kuwait, kyrgyzstan,
laos, latvia, lebanon, liberia, libya, liechtenstein, lithuania, luxembourg,
macedonia, madagascar, malawi, malaysia, maldives, mali, malta, martinique, mauritania, mauritius, mayotte, mexico, moldova, monaco, mongolia, montenegro, montserrat, morocco, mozambique, myanmar,
namibia, nepal, netherlands, new-caledonia, new-zealand, nicaragua, niger, nigeria, norway,
oman,
pakistan, panama, papua-new-guinea, paraguay, peru, philippines, poland, portugal,
qatar,
reunion, romania, russia, rwanda,
saint-barthelemy, saint-kitts-and-nevis, saint-lucia, saint-martin, saint-vincent-and-the-grenadines, san-marino, saudi-arabia, senegal, serbia, seychelles, sierra-leone, singapore, sint-maarten, slovakia, slovenia, somalia, south-africa, south-korea, spain, sri-lanka, state-of-palestine, sudan, suriname, swaziland, sweden, switzerland, syria,
taiwan, tanzania, thailand, timor-leste, togo, trinidad-and-tobago, tunisia, turkey, turks-and-caicos-islands,
uganda, uk, ukraine, united-arab-emirates, uruguay, us, uzbekistan,
venezuela, viet-nam,
zambia, zimbabwe
`;

@Injectable()
export class CovidService {
  countryList(): string[] {
    return COUNTRIES_LIST.replace(/[\n\r]+/g, '')
      .replace(/\s*/g, '')
      .split(',');
  }

  async getByCountryName(dto: getByCountryNameDto) {
    let res = null;
    try {
      const covidData = await covidApi.getReportsByCountries(dto.country);
      const countryData = covidData[0][0];
      res = `
        Страна: ${countryData.country},
        Случаи: ${countryData.cases},
        Смерти: ${countryData.deaths},
        Выздоровело: ${countryData.recovered}`;
    } catch (e) {
      console.log(e);
      res = 'Такой страны не существует';
    }
    return res;
  }
}
