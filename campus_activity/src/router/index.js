import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import c_nav from '@/components/c_nav'
import c_banner from '@/components/c_banner'
import c_er_nav from '../components/c_ej_nav.vue'
import c_login from '../components/c_login.vue'
import c_wode from '../components/c_wode.vue'
import c_act from '../components/c_act.vue'
import c_setting from '../components/c_setting.vue'
import c_xxgl from '../components/c_xxgl.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/home',
      components:{
        default:c_nav,
        'main':HelloWorld,
        'banner':c_banner,
        'er_nav':c_er_nav
      },
      children:[
        {
          path:"children",
          components:{
            "son-page":HelloWorld
          }
        }
      ]
    }, {
      path: '/', 
      redirect: '/home' 
    },{
      path:'/hello',
      components:{
        default:HelloWorld
      }
    },{
      path:'/login:index',
      components:{
        default:c_login
      }
    },{
      path:'/wode:index',
      components:{
        default:c_wode
      }
    },{
      path:'/act',
      components:{
        default:c_act
      }
    },{
      path:'/setting:index',
      components:{
        default:c_setting
      }
    },{
      path:'/xxgl',
      components:{
        default:c_xxgl
      }
    }
  ],
  mode:'history'
})
