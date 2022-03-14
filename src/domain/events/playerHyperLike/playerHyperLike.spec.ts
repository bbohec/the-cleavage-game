
import { Sound } from '../../entities/sound'
import { SupportedSound } from '../../entities/SoundType'
import { Gherkin } from '../../tests/Gherkin'
import { clientScenario } from '../../tests/clientScenario'
import { feature } from '../../tests/feature'
import { whenEventOccurs } from '../../tests/unitTests/eventGateway'

import { theInterfaceGatewayHasPlayingSounds } from '../../tests/unitTests/interfaceGateway'
import { EventType } from '../EventType'
import { PlayerHyperLikeEvent } from './PlayerHyperLikeEvent'

feature(EventType.PLAYER_HYPERLIKE, [
    clientScenario('Scenario 1 : Player hyper like', [
        app => whenEventOccurs(app, new PlayerHyperLikeEvent()),
        app => theInterfaceGatewayHasPlayingSounds(Gherkin.THEN, app, new Sound(SupportedSound.HYPERLIKE))
    ])
])
