import type { ApplicationEvent } from '../../events/GameEvent'
import type { UseCase } from '../../usecases/UseCase'
import type { ApplicationServices } from '../ApplicationServices'
import { EventType } from '../../events/EventType'
import { ApplicationStartUseCase } from '../../usecases/ApplicationStartUseCase'
import { AskForHelpUseCase } from '../../usecases/AskForHelpUseCase'
import { CancelCleavageUseCase } from '../../usecases/CancelCleavageUseCase'
import { ChangeMusicVolumeUseCase } from '../../usecases/ChangeMusicVolumeUseCase'
import { ChangeSoundVolumeUseCase } from '../../usecases/ChangeSoundVolumeUseCase'
import { NavigateUseCase } from '../../usecases/NavigateUseCase'
import { PlayerApplauseUseCase } from '../../usecases/PlayerApplauseEvent'
import { PlayerCleaveUseCase } from '../../usecases/PlayerCleaveUseCase'
import { PlayerHyperLikeUseCase } from '../../usecases/PlayerHyperLikeUseCase'
import { PlayerQuitUseCase } from '../../usecases/PlayerQuitUseCase'
import { PlayerShootUseCase } from '../../usecases/PlayerShootUseCase'
import { PlayerWhistleUseCase } from '../../usecases/PlayerWhistleUseCase'
import { SuggestCleavageUseCase } from '../../usecases/SuggestCleavageUseCase'
import { LaunchCleavageUseCase } from '../../usecases/LaunchCleavageUseCase'
import { DisconnectChatUseCase } from '../../usecases/DisconnectChatUseCase'
import { DrawCleavageUseCase } from '../../usecases/DrawCleavageUseCase'
import { NewCleavageUseCase } from '../../usecases/NewCleavageUseCase'
import { ConnectChatUseCase } from '../../usecases/ConnectChatUseCase'
import { eventNotSupported } from '../../messages/messages'
import { PlayerMessageUseCase } from '../../usecases/PlayerMessageUseCase'
import { CheckAutoplayUseCase } from '../../usecases/CheckAutoplayUseCase'
import { StartAutoplayUseCase } from '../../usecases/StartAutoplayUseCase'
import { StopAutoplayUseCase } from '../../usecases/StopAutoplayUseCase'

export class PrimaryController {
    constructor (private applicationServices:ApplicationServices) {
        this.useCases.set(EventType.DISCONNECT_CHAT, new DisconnectChatUseCase(this.applicationServices))
        this.useCases.set(EventType.CONNECT_CHAT, new ConnectChatUseCase(this.applicationServices))
        this.useCases.set(EventType.NEW_CLEAVAGE, new NewCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.LAUNCH_CLEAVAGE, new LaunchCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_MESSAGE, new PlayerMessageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_CLEAVE, new PlayerCleaveUseCase(this.applicationServices))
        this.useCases.set(EventType.DRAW_CLEAVAGE, new DrawCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_SUGGEST_CLEAVAGE, new SuggestCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_ASK_FOR_HELP, new AskForHelpUseCase(this.applicationServices))
        this.useCases.set(EventType.CANCEL_CLEAVAGE, new CancelCleavageUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_APPLAUSE, new PlayerApplauseUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_HYPERLIKE, new PlayerHyperLikeUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_WHISTLE, new PlayerWhistleUseCase(this.applicationServices))
        this.useCases.set(EventType.PLAYER_SHOOT, new PlayerShootUseCase(this.applicationServices))
        this.useCases.set(EventType.APPLICATION_START, new ApplicationStartUseCase(this.applicationServices))
        this.useCases.set(EventType.NAVIGATE, new NavigateUseCase(this.applicationServices))
        this.useCases.set(EventType.CHANGE_MUSIC_VOLUME, new ChangeMusicVolumeUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.CHANGE_SOUND_VOLUME, new ChangeSoundVolumeUseCase(this.applicationServices.interface))
        this.useCases.set(EventType.PLAYER_QUIT, new PlayerQuitUseCase(this.applicationServices))
        this.useCases.set(EventType.START_AUTOPLAY, new StartAutoplayUseCase(this.applicationServices))
        this.useCases.set(EventType.CHECK_AUTOPLAY, new CheckAutoplayUseCase(this.applicationServices))
        this.useCases.set(EventType.STOP_AUTOPLAY, new StopAutoplayUseCase(this.applicationServices))
    }

    executeEvent (event: ApplicationEvent): Promise<void> {
        const usecase = this.useCases.get(event.eventType)
        return usecase
            ? usecase.execute(event)
            : Promise.reject(new Error(eventNotSupported(event)))
    }

    private useCases: Map<EventType, UseCase> = new Map([])
}
