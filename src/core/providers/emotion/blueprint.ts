export interface IEmotion {
    color: string,
    logo: any,
    name: string,
    sub?: IEmotion,
    leftSub?: IEmotion,
    rightSub?: IEmotion,
}