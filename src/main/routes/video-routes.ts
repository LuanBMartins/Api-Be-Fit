import { Router } from 'express'
import ExpressRouterAdapter from '../adapter/express-route-adapter'
import VideoCreateRouterComposer from '../composer/video/video-create-compose'
import VideoUpdateRouterComposer from '../composer/video/video-update-composer'
import VideoDeleteRouterComposer from '../composer/video/video-delete-composer'
import VideoListRouterComposer from '../composer/video/video-list-composer'
import PersonalUpdateRouterComposer from '../composer/video/video-upload-composer'

module.exports = (router: Router) => {
  router.post('/video/upload/aws', ExpressRouterAdapter.adapt(PersonalUpdateRouterComposer.composer()))
  router.post('/video/create/', ExpressRouterAdapter.adapt(VideoCreateRouterComposer.composer()))
  router.put('/video/update/:id', ExpressRouterAdapter.adapt(VideoUpdateRouterComposer.composer()))
  router.delete('/video/delete/:id', ExpressRouterAdapter.adapt(VideoDeleteRouterComposer.composer()))
  router.post('/video/list/', ExpressRouterAdapter.adapt(VideoListRouterComposer.composer()))
}
