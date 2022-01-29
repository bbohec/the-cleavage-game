import type { InterfaceApplicationService } from '../applicationServices/InterfaceApplicationService'
import { Sound } from '../entities/sound'
import { SupportedSound } from '../entities/SoundType'
import type { CancelCleavageEvent } from '../events/cancelCleavage/CancelCleavageEvent'
import { UseCase } from './UseCase'

export class CancelCleavageUseCase extends UseCase {
    constructor (
        private interfaceApplicationService:InterfaceApplicationService
    ) { super() }

    execute (event: CancelCleavageEvent): Promise<void> {
        return this.interfaceApplicationService.clearCleavage()
            .then(() => this.interfaceApplicationService.playSound(new Sound(SupportedSound.QUACK)))
            .catch(error => Promise.reject(error))
    }
}
