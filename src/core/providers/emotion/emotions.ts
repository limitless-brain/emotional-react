import {IEmotion} from "./blueprint";
import colors from "../../theme/colors";
import fear_img from "./assets/fear.png";
import joy_img from "./assets/joy.png";
import neutral_img from "./assets/neutral.png";
import anger_img from "./assets/anger.png";
import sadness_img from "./assets/sadness.png";
import disgust_img from "./assets/disgust.png";

export const serenity: IEmotion = {
    color: '',
    logo: undefined,
    name: 'serenity',
    leftSub: undefined
}
export const interest: IEmotion = {
    color: '',
    logo: undefined,
    name: 'interest',
    rightSub: undefined
}
export const annoyance: IEmotion = {
    color: '',
    logo: undefined,
    name: 'annoyance'
}
export const boredom: IEmotion = {
    color: '',
    logo: undefined,
    name: 'boredom'
}
export const pensiveness: IEmotion = {
    color: '',
    logo: undefined,
    name: 'pensiveness'
}
export const distraction: IEmotion = {
    color: '',
    logo: undefined,
    name: 'distraction'
}
export const apprehension: IEmotion = {
    color: '',
    logo: undefined,
    name: 'apprehension'
}
export const joy: IEmotion = {
    color: colors.joy,
    logo: joy_img,
    name: 'joy'
}
export const sadness: IEmotion = {
    color: colors.sadness,
    logo: sadness_img,
    name: 'sadness'
}
export const anger: IEmotion = {
    color: colors.anger,
    logo: anger_img,
    name: 'anger'
}
export const disgust: IEmotion = {
    color: colors.disgust,
    logo: disgust_img,
    name: 'disgust'
}
export const love: IEmotion = {
    color: colors.love,
    logo: undefined,
    name: 'love'
}
export const fear: IEmotion = {
    color: colors.fear,
    logo: fear_img,
    name: 'fear'
}
export const neutral: IEmotion = {
    color: colors.neutral,
    logo: neutral_img,
    name: "neutral"
}
export const trust: IEmotion = {
    color: colors.neutral,
    logo: undefined,
    name: "neutral"
}
export const surprise: IEmotion = {
    color: colors.surprise,
    logo: undefined,
    name: "surprise"
}
export const anticipation: IEmotion = {
    color: colors.neutral,
    logo: undefined,
    name: "neutral"
}
export const ecstasy: IEmotion = {
    color: "",
    logo: undefined,
    name: "ecstasy",
    sub: joy
}
export const admiration: IEmotion = {
    color: "",
    logo: undefined,
    name: "admiration",
    sub: trust
}
export const terror: IEmotion = {
    color: "",
    logo: undefined,
    name: "terror",
    sub: fear
}
export const amazement: IEmotion = {
    color: "",
    logo: undefined,
    name: "amazement",
    sub: surprise
}
export const grief: IEmotion = {
    color: "",
    logo: undefined,
    name: "grief",
    sub: sadness
}
export const loathing: IEmotion = {
    color: "",
    logo: undefined,
    name: "loathing",
    sub: disgust
}
export const rage: IEmotion = {
    color: "",
    logo: undefined,
    name: "rage",
    sub: anger
}
export const vigilance: IEmotion = {
    color: "",
    logo: undefined,
    name: "vigilance",
    sub: anticipation
}

export const EMOTION_TEXT_COLOR = '#000000'

export const emotions = [
    neutral,
    joy,
    surprise,
    sadness,
    anger,
    disgust,
    fear
]