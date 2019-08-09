const router = require('koa-router')()
const userService = require('../controllers/mysqlConfig');

router.prefix('/users')

//获取所有用户(GET请求)
router.get('/', async (ctx, next) => {
    
    ctx.body = await userService.findUserData('liyu');
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
  let arr = [];

  console.log(ctx.request.body)

  arr.push(ctx.request.body['userid']);
  arr.push(ctx.request.body['username']);
  arr.push(ctx.request.body['password']);

  await userService.addUserData(arr)
      .then((data) => {
          ctx.body = {
              data
          }
      }).catch(() => {
          ctx.body = {
              data: 'err'
          }
      })
})

router.post('/login', async (ctx, next) => {
    try {
        const obj = ctx.request.body
        console.log(': obj', obj)
        ctx.body = await userService.checkPassWord(obj)
        console.log(':  ctx.body',  ctx.body)
        if (ctx.body.length > 0) {
            ctx.body= {
                code: '000000',
                msg: '登录成功'
            }
        } else {
            ctx.body= {
                code: '99999',
                msg: '用户名或密码不正确'
            } 
        }
    } catch (error) {
        ctx.body= {
            code: '99999',
            msg: '用户名或密码不正确'
        } 
    }
})

module.exports = router