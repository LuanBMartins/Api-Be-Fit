import VIdeoModel from './video-model'

export default interface VideoCreateHttpRequest {
    body: VIdeoModel,
    headers: {authorization: string},
    params: {id: number}
}
