// themeConfig.js
import React from "react";

import { IconTypeAnhkdefault } from '../assets/icons/egypt/IconTypeAnhkdefault';
import { IconTypeAnubisdefault } from '../assets/icons/egypt/IconTypeAnubisdefault';
import { IconTypeEyePyramiddefault } from '../assets/icons/egypt/IconTypeEyePyramiddefault';
import { IconTypeFeatherdefault } from '../assets/icons/egypt/IconTypeFeatherdefault';
import { IconTypeHorusdefault } from '../assets/icons/egypt/IconTypeHorusdefault';
import { IconTypePharoahdefault } from '../assets/icons/egypt/IconTypePharoahdefault';
import { IconTypePyramiddefault } from '../assets/icons/egypt/IconTypePyramiddefault';
import { IconTypeScarabdefault } from '../assets/icons/egypt/IconTypeScarabdefault';
import { IconTypeSleighdefault } from '../assets/icons/egypt/IconTypeSleighdefault';
import { IconTypeSphinxdefault } from '../assets/icons/egypt/IconTypeSphinxdefault';
import { IconTypeSunRadefault } from '../assets/icons/egypt/IconTypeSunRadefault';
import { IconTypeTabletdefault } from '../assets/icons/egypt/IconTypeTabletdefault';
import { IconTypeLucky } from '../assets/icons/IconTypeLucky';

import { IconTypeBreifcasedefault } from '../assets/icons/international/IconTypeBreifcasedefault';
import { IconTypeCanyondefault } from '../assets/icons/international/IconTypeCanyondefault';
import { IconTypeColleseumdefault } from "../assets/icons/international/IconTypeColleseumdefault";
import { IconTypeEifelldefault } from '../assets/icons/international/IconTypeEifelldefault';
import { IconTypeLibertydefault } from '../assets/icons/international/IconTypeLibertydefault';
import { IconTypeNiagraFallsdefault } from "../assets/icons/international/IconTypeNiagraFallsdefault";
import { IconTypePassportdefault } from "../assets/icons/international/IconTypePassportdefault";
import { IconTypePlanedefault } from '../assets/icons/international/IconTypePlanedefault';
import { IconTypeSuitcasedefault } from '../assets/icons/international/IconTypeSuitcasedefault';
import { IconTypeTajdefault } from '../assets/icons/international/IconTypeTajdefault';
import { IconTypeTravellerdefault } from "../assets/icons/international/IconTypeTravellerdefault";
import { IconTypeVandefault } from "../assets/icons/international/IconTypeVandefault";
import { IconTypeAnubisActive } from '../assets/icons/egypt/IconTypeAnubisActive';
import { IconTypeAnhkActive } from '../assets/icons/egypt/IconTypeAnhkActive';
import { IconTypeFeatherActive } from '../assets/icons/egypt/IconTypeFeatherActive';
import { IconTypeHorusActive } from '../assets/icons/egypt/IconTypeHorusActive';
import { IconTypePyramidActive } from '../assets/icons/egypt/IconTypePyramidActive';
import { IconTypeScarabActive } from '../assets/icons/egypt/IconTypeScarabActive';
import { IconTypeSphinxActive } from '../assets/icons/egypt/IconTypeSphinxActive';
import { IconTypeTabletActive } from '../assets/icons/egypt/IconTypeTabletActive';
import { IconTypeSunRaActive } from '../assets/icons/egypt/IconTypeSunRaActive';
import { IconTypeEyePyramidActive } from '../assets/icons/egypt/IconTypeEyePyramidActive';
import { IconTypePharoahActive } from '../assets/icons/egypt/IconTypePharoahActive';
import { IconTypeSleighActive } from '../assets/icons/egypt/IconTypeSleighActive';
import { IconTypeBreifcaseActive } from '../assets/icons/international/IconTypeBreifcaseActive';
import { IconTypeCanyonActive } from '../assets/icons/international/IconTypeCanyonActive';
import { IconTypeColleseumActive } from '../assets/icons/international/IconTypeColleseumActive';
import { IconTypeEifellActive } from '../assets/icons/international/IconTypeEifellActive';
import { IconTypeLibertyActive } from '../assets/icons/international/IconTypeLibertyActive';
import { IconTypeNiagraFallsActive } from '../assets/icons/international/IconTypeNiagraFallsActive';
import { IconTypePassportActive } from '../assets/icons/international/IconTypePassportActive';
import { IconTypePlaneActive } from '../assets/icons/international/IconTypePlaneActive';
import { IconTypeSuitcaseActive } from '../assets/icons/international/IconTypeSuitcaseActive';
import { IconTypeTajActive } from '../assets/icons/international/IconTypeTajActive';
import { IconTypeTravellerActive } from '../assets/icons/international/IconTypeTravellerActive';
import { IconTypeVanActive } from '../assets/icons/international/IconTypeVanActive';
import { IconTypeCentaurdefault } from '../assets/icons/mythology/IconTypeCentaurdefault';
import { IconTypeCentaurActive } from '../assets/icons/mythology/IconTypeCentaurActive';
import { IconTypeHarpdefault } from '../assets/icons/mythology/IconTypeHarpdefault';
import { IconTypeHarpActive } from '../assets/icons/mythology/IconTypeHarpActive';
import { IconTypeHelmetdefault } from '../assets/icons/mythology/IconTypeHelmetdefault';
import { IconTypeHelmetActive } from '../assets/icons/mythology/IconTypeHelmetActive';
import { IconTypeMedusadefault } from '../assets/icons/mythology/IconTypeMedusadefault';
import { IconTypeMedusaActive } from '../assets/icons/mythology/IconTypeMedusaActive';
import { IconTypeOlivedefault } from '../assets/icons/mythology/IconTypeOlivedefault';
import { IconTypeOliveActive } from '../assets/icons/mythology/IconTypeOliveActive';
import { IconTypePillarActive } from '../assets/icons/mythology/IconTypePillarActive';
import { IconTypePillardefault } from '../assets/icons/mythology/IconTypePillardefault';
import { IconTypeRuinsdefault } from '../assets/icons/mythology/IconTypeRuinsdefault';
import { IconTypeRuinsActive } from '../assets/icons/mythology/IconTypeRuinsActive';
import { IconTypeShielddefault } from '../assets/icons/mythology/IconTypeShielddefault';
import { IconTypeShieldActive } from '../assets/icons/mythology/IconTypeShieldActive';
import { IconTypeTorchdefault } from '../assets/icons/mythology/IconTypeTorchdefault';
import { IconTypeTorchActive } from '../assets/icons/mythology/IconTypeTorchActive';
import { IconTypeTroyBowdefault } from '../assets/icons/mythology/IconTypeTroyBowdefault';
import { IconTypeTroyBowActive } from '../assets/icons/mythology/IconTypeTroyBowActive';
import { IconTypeVasedefault } from '../assets/icons/mythology/IconTypeVasedefault';
import { IconTypeVaseActive } from '../assets/icons/mythology/IconTypeVaseActive';
import { IconTypeZeusActive } from "../assets/icons/mythology/IconTypeZeusActive";
import { IconTypeZeusdefault } from "../assets/icons/mythology/IconTypeZeusdefault";

const themes = {
    egypt: {
        gameCenterIcon: require('./../assets/image/egypt/game_center_icon.png'),
        backgroundLoop: require('./../assets/video/egypt/background_movie_loop.mp4'),
        iconsDefault: [
            <IconTypeAnubisdefault key="0" />,
            <IconTypeAnhkdefault key="1" />,
            <IconTypeFeatherdefault key="2" />,
            <IconTypeHorusdefault key="3" />,
            <IconTypePyramiddefault  key="4" />,
            <IconTypeScarabdefault key="5" />,
            <IconTypeSphinxdefault  key="6" />,
            <IconTypeTabletdefault  key="7" />,
            <IconTypeSunRadefault  key="8" />,
            <IconTypeEyePyramiddefault  key="9" />,
            <IconTypePharoahdefault  key="10" />,
            <IconTypeSleighdefault  key="11" />,
            <IconTypeLucky key="12" />
        ],
        iconsActive: [
            <IconTypeAnubisActive key="0" />,
            <IconTypeAnhkActive key="1" />,
            <IconTypeFeatherActive key="2" />,
            <IconTypeHorusActive key="3" />,
            <IconTypePyramidActive  key="4" />,
            <IconTypeScarabActive key="5" />,
            <IconTypeSphinxActive  key="6" />,
            <IconTypeTabletActive  key="7" />,
            <IconTypeSunRaActive  key="8" />,
            <IconTypeEyePyramidActive  key="9" />,
            <IconTypePharoahActive  key="10" />,
            <IconTypeSleighActive  key="11" />,
        ],
    },
    mythology: {
        gameCenterIcon: require('./../assets/image/mythology/game_center_icon.png'),
        backgroundLoop: require('./../assets/video/mythology/background_movie_loop.mp4'),
        iconsDefault: [
            <IconTypeCentaurdefault key="0" />,
            <IconTypeHarpdefault key="1" />,
            <IconTypeHelmetdefault key="2" />,
            <IconTypeMedusadefault key="3" />,
            <IconTypeOlivedefault  key="4" />,
            <IconTypePillardefault key="5" />,
            <IconTypeRuinsdefault  key="6" />,
            <IconTypeShielddefault  key="7" />,
            <IconTypeTorchdefault  key="8" />,
            <IconTypeTroyBowdefault  key="9" />,
            <IconTypeVasedefault  key="10" />,
            <IconTypeZeusdefault  key="11" />,
            <IconTypeLucky key="12" />
        ],
        iconsActive: [
            <IconTypeCentaurActive key="0" />,
            <IconTypeHarpActive key="1" />,
            <IconTypeHelmetActive key="2" />,
            <IconTypeMedusaActive key="3" />,
            <IconTypeOliveActive  key="4" />,
            <IconTypePillarActive key="5" />,
            <IconTypeRuinsActive key="6" />,
            <IconTypeShieldActive  key="7" />,
            <IconTypeTorchActive  key="8" />,
            <IconTypeTroyBowActive  key="9" />,
            <IconTypeVaseActive  key="10" />,
            <IconTypeZeusActive  key="11" />,
        ],
    },
    international: {
        gameCenterIcon: require('./../assets/image/international/game_center_icon.png'),
        backgroundLoop: require('./../assets/video/international/background_movie_loop.mp4'),
        iconsDefault: [
            <IconTypeBreifcasedefault key="0" />,
            <IconTypeCanyondefault key="1" />,
            <IconTypeColleseumdefault key="2" />,
            <IconTypeEifelldefault key="3" />,
            <IconTypeLibertydefault  key="4" />,
            <IconTypeNiagraFallsdefault key="5" />,
            <IconTypePassportdefault  key="6" />,
            <IconTypePlanedefault  key="7" />,
            <IconTypeSuitcasedefault  key="8" />,
            <IconTypeTajdefault  key="9" />,
            <IconTypeTravellerdefault  key="10" />,
            <IconTypeVandefault  key="11" />,
            <IconTypeLucky key="12" />
        ],
        iconsActive: [
            <IconTypeBreifcaseActive key="0" />,
            <IconTypeCanyonActive key="1" />,
            <IconTypeColleseumActive key="2" />,
            <IconTypeEifellActive key="3" />,
            <IconTypeLibertyActive  key="4" />,
            <IconTypeNiagraFallsActive key="5" />,
            <IconTypePassportActive  key="6" />,
            <IconTypePlaneActive  key="7" />,
            <IconTypeSuitcaseActive  key="8" />,
            <IconTypeTajActive  key="9" />,
            <IconTypeTravellerActive  key="10" />,
            <IconTypeVanActive  key="11" />,
        ],
    },
    cowboy: {
        gameCenterIcon: require('./../assets/image/cowboy/game_center_icon.png'),
        backgroundLoop: require('./../assets/video/egypt/background_movie_loop.mp4'),
        iconsDefault: [
            <IconTypeAnubisdefault key="0" />,
            <IconTypeAnhkdefault key="1" />,
            <IconTypeFeatherdefault key="2" />,
            <IconTypeHorusdefault key="3" />,
            <IconTypePyramiddefault  key="4" />,
            <IconTypeScarabdefault key="5" />,
            <IconTypeSphinxdefault  key="6" />,
            <IconTypeTabletdefault  key="7" />,
            <IconTypeSunRadefault  key="8" />,
            <IconTypeEyePyramiddefault  key="9" />,
            <IconTypePharoahdefault  key="10" />,
            <IconTypeSleighdefault  key="11" />,
            <IconTypeLucky key="12" />
        ],
        iconsActive: [
            <IconTypeAnubisActive key="0" />,
            <IconTypeAnhkActive key="1" />,
            <IconTypeFeatherActive key="2" />,
            <IconTypeHorusActive key="3" />,
            <IconTypePyramidActive  key="4" />,
            <IconTypeScarabActive key="5" />,
            <IconTypeSphinxActive  key="6" />,
            <IconTypeTabletActive  key="7" />,
            <IconTypeSunRaActive  key="8" />,
            <IconTypeEyePyramidActive  key="9" />,
            <IconTypePharoahActive  key="10" />,
            <IconTypeSleighActive  key="11" />,
        ],
    },
};

export default themes;
