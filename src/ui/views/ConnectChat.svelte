<script lang="ts">
    import { afterUpdate,onDestroy } from "svelte";
    import { InterfaceView } from "../../domain/entities/InterfaceView";
    import { CheckRegisteredStreamerEvent } from "../../domain/events/checkRegisteredStreamer/CheckRegisteredStreamerEvent";
    import { ConnectChatEvent } from "../../domain/events/connectChat/ConnectChatEvent";
    import { NavigateEvent } from "../../domain/events/navigateEvent/NavigateEvent";
    import { RegisterStreamerEvent } from "../../domain/events/registerStreamer/RegisterStreamerEvent";
    import Button from "../components/button/button.svelte";
    import CheckBox from "../components/inputs/checkBox.svelte";
    import TextBox from "../components/inputs/textBox.svelte";
    import LinkComponent from "../components/link/linkComponent.svelte";
    import Subtitle from "../components/text/subtitle.svelte";
    import Title from "../components/text/title.svelte";
    import { applicationEventStore,isStreamerRegisteredStore } from "../stores/stores";
    let username:string = ""
    let token:string = ""
    let channel:string = ""
    let isRegisterStreamer:boolean
    let onRegisterStreamerChange:((event: Event & {
    currentTarget: EventTarget & HTMLInputElement;
}) => void) = (event) =>{isRegisterStreamer = event.currentTarget.checked}
    const onConnect = () => {
        if(isRegisterStreamer) applicationEventStore.set(new RegisterStreamerEvent(username))
        applicationEventStore.set(new ConnectChatEvent(username, token, channel))
        }
    afterUpdate(() => {
        if (username && token && channel) applicationEventStore.set(new CheckRegisteredStreamerEvent(username)) 
        isStreamerRegisteredStore.subscribe(value=> console.log("isStreamerRegisteredStore",value))
    })
    onDestroy(()=>isStreamerRegisteredStore.set(undefined))
</script>
<main class=" h-full w-full flex flex-col justify-evenly">
    <div class="flex flex-col w-full items-center">
        <Title/>
        <Subtitle subtitle="Connectes-toi sur ta chaine Twitch.
        Tu peux utiliser le compte que tu veux.
        Ton compte perso, un bot ..."/>
    </div>
    <div  class="flex flex-row place-items-center justify-center ">
        <div  class="flex flex-col items-center p-2 bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10 border border-white border-opacity-20 drop-shadow">
                <TextBox id="user" name="user" bind:inputValue={username} placeholder="Utilisateur Twitch" width="w-full"/>
                <TextBox id="password" name="password" bind:inputValue={token} placeholder="Token Twitch" type="password"  width="w-full"/>
                <LinkComponent text="Twitch Token Generator" href="https://twitchapps.com/tmi/" newTab={true} />
                <TextBox id="channel" name="channel" bind:inputValue={channel} placeholder="Chaine Twitch"  width="w-full"/>
                {#if username && token && channel && ($isStreamerRegisteredStore !== undefined)}
                    <CheckBox checked={$isStreamerRegisteredStore} onChange={onRegisterStreamerChange} label={"Faire parti de l'annuaire<br>des streamers?"} id={"registerStreamer"}/>
                    <Button text="Connexion Twitch" emphasis="high" onClick={onConnect}  width="w-full"/>
                {/if}
                <Button text="Menu principal" emphasis="medium" onClick={() => applicationEventStore.set(new NavigateEvent(InterfaceView.MAIN_MENU)) } width="w-full"/>   
        </div>
    </div>
</main>