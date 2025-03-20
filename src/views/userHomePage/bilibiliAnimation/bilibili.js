const BilibiliJS = () => {
  const bodyBiliBili = document.getElementById('MyappBiliBili')
  const lerp = (start, end, amt) => (1 - amt) * start + amt * end // 计算线性插值

  // 地址：src/views/userHomePage/
  // import barnersData from './config.js'
  // let allImagesData = barnersData[6].data
  let allImagesData = [
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 0],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/17a1bcfacfc51f000cad0611dca32020b18db6f5.png@1c.webp',
      a: 0,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 0],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/f0ba9b7f8d4ec1745a08cabdf3951ceb4aa266d1.png@1c.webp',
      a: 0.0012121200000000001,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 300, 24],
      width: 2400,
      height: 224,
      src: 'src/views/userHomePage/assets/2024-06-06/be5632d3f86228a81979b8a85ce9cf0d5df541e0.png@1c.webp',
      a: 0.003636000000000024,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 330, 33],
      width: 2200,
      height: 206,
      src: 'src/views/userHomePage/assets/2024-06-06/f63cf9726b73c78ececc43ff16f3336fdfc76748.png@1c.webp',
      a: 0.02,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/2c32dd208cb8f317ac78e03c78da5cd04b9a1410.png@1c.webp',
      a: 0.00727273,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/e04d0fbaaf67bdb0de7c40dca04180a9c1defa0a.png@1c.webp',
      a: 0.0109091,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/d5113ee4aaca71d7e7570a45b1e541efc0deca71.png@1c.webp',
      a: 0.018181799999999998,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/ae0543610dd9b3d0903cec7a6982200691dce1b5.png@1c.webp',
      a: 0.00930706,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/6d9f792b3458e0b6f8647f7ad3958b1c1438d50e.png@1c.webp',
      a: 0.018181799999999998,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/f3945f0ed928e45fb58c8a1edb07358ec719c8df.png@1c.webp',
      a: 0.0242424,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/ba22577d90164e589f87f9073d56953ff3e30088.png@1c.webp',
      a: 0.0333333,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 100, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/d6ef89533fed72dfde53009ac2aab66009ab545a.png@1c.webp',
      a: 0.018182000000000004,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/8cacfce7b1f44f707836fa4fb68444a9c7202d63.png@1c.webp',
      a: 0.036363599999999996,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 10],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/ff63f10698f5f0a9e9083d90c6f32de5269801d4.png@1c.webp',
      a: 0.0484848,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/5630bebd1068fa6c46eaea4ffa9b004f882d7d33.png@1c.webp',
      a: 0.0484848,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/a7ead379e7a6653cd70f24e8556ce336702abb3a.png@1c.webp',
      a: 0.0484848,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/06336184ba84f89890f50e867012c05914219947.png@1c.webp',
      a: 0.0727273,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, -100, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/ddc58cd92df71ada0be9bad00b2139a34872ef94.png@1c.webp',
      a: 0.10909091,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, -90, 0],
      width: 1800,
      height: 168,
      src: 'src/views/userHomePage/assets/2024-06-06/996a5656d3a31738f79b67d94ea0b654fba169ac.png@1c.webp',
      a: 0.1636364,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 0],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/905fbc85df462f16c3fe0b83f0e5814696818a56.png@1c.webp',
      a: 0.0727273,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 0],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/4d37acea06841ace858f27cab3a5596d9fdd8354.png@1c.webp',
      a: 0.09090909999999999,
    },
    {
      tagName: 'video',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, -245, 15],
      width: 180,
      height: 100,
      src: 'src/views/userHomePage/assets/2024-06-06/9c1a6b86-0480-43b6-86e5-3faa3ba4de7b.mp4',
      a: 0.04424600000000001,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 0],
      width: 2200,
      height: 206,
      src: 'src/views/userHomePage/assets/2024-06-06/d4d4569741806055f36c4d9140bdd7069a50ec09.png@1c.webp',
      a: 0.133333,
    },
    {
      tagName: 'img',
      opacity: ['1', '1'],
      transform: [1, 0, 0, 1, 0, 15],
      width: 2000,
      height: 187,
      src: 'src/views/userHomePage/assets/2024-06-06/2dd4a5f8aee1829bcdae687052853b8947a5d2f6.png@1c.webp',
      a: 0.121212,
    },
  ]

  let compensate = 0 // 视窗补偿值
  let layers = [] // DOM集合

  // 添加图片元素
  function initItems() {
    compensate = window.innerWidth > 1650 ? window.innerWidth / 1650 : 1
    if (layers.length <= 0) {
      const cloneData = JSON.parse(JSON.stringify(allImagesData))
      bodyBiliBili.style.display = 'none'
      for (let i = 0; i < cloneData.length; i++) {
        const item = cloneData[i]
        const layer = document.createElement('div')
        layer.classList.add('layer')
        if (compensate !== 1) {
          item.transform[4] = item.transform[4] * compensate
          item.transform[5] = item.transform[5] * compensate
        }
        layer.style = 'transform:' + new DOMMatrix(item.transform)
        item.opacity && (layer.style.opacity = item.opacity[0])
        const child = document.createElement(item.tagName || 'img')
        if (item.tagName === 'video') {
          child.loop = true
          child.autoplay = true
          child.muted = true
        }
        child.src = item.src
        child.style.filter = `blur(${item.blur}px)`
        child.style.width = `${item.width * compensate}px`
        child.style.height = `${item.height * compensate}px`
        layer.appendChild(child)
        bodyBiliBili.appendChild(layer)
      }
      bodyBiliBili.style.display = ''
      layers = document.querySelectorAll('.layer')
    } else {
      // 窗口大小变动时重新计算内容
      const cloneData = JSON.parse(JSON.stringify(allImagesData))
      for (let i = 0; i < layers.length; i++) {
        const item = cloneData[i]
        layers[i].firstElementChild.style.width = `${item.width * compensate}px`
        layers[i].firstElementChild.style.height = `${item.height * compensate}px`
        item.transform[4] = item.transform[4] * compensate
        item.transform[5] = item.transform[5] * compensate
        layers[i].style.transform = new DOMMatrix(item.transform)
      }
    }
  }
  initItems()

  let initX = 0
  let moveX = 0
  let startTime = 0
  const duration = 300 // 动画持续时间（毫秒）
  function mouseMove() {
    // 滑动操作
    animate()
  }
  function leave() {
    startTime = 0
    requestAnimationFrame(homing) // 开始动画
  }
  function homing(timestamp) {
    !startTime && (startTime = timestamp)
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    animate(progress) // 传递动画进度
    progress < 1 && requestAnimationFrame(homing) // 继续下一帧
  }
  // 动画执行
  function animate(progress) {
    if (layers.length <= 0) return
    const isHoming = typeof progress === 'number'
    for (let i = 0; i < layers.length; i++) {
      const layer = layers[i]
      const item = allImagesData[i]
      let m = new DOMMatrix(item.transform)
      let move = moveX * item.a // 移动X translateX
      let s = item.f ? item.f * moveX + 1 : 1 // 放大比例 Scale
      let g = moveX * (item.g || 0) // 移动Y translateY
      if (isHoming) {
        // 回正时处理
        m.e = lerp(moveX * item.a + item.transform[4], item.transform[4], progress)
        move = 0
        s = lerp(item.f ? item.f * moveX + 1 : 1, 1, progress)
        g = lerp(item.g ? item.g * moveX : 0, 0, progress)
      }
      m = m.multiply(new DOMMatrix([m.a * s, m.b, m.c, m.d * s, move, g]))
      if (item.deg) {
        // 有旋转角度
        const deg = isHoming ? lerp(item.deg * moveX, 0, progress) : item.deg * moveX
        m = m.multiply(
          new DOMMatrix([Math.cos(deg), Math.sin(deg), -Math.sin(deg), Math.cos(deg), 0, 0]),
        )
      }
      if (item.opacity) {
        // 有透明度变化
        layer.style.opacity =
          isHoming && moveX > 0
            ? lerp(item.opacity[1], item.opacity[0], progress)
            : lerp(item.opacity[0], item.opacity[1], (moveX / window.innerWidth) * 2)
      }
      layer.style.transform = m // 应用所有变换效果
    }
  }
  // 鼠标滑入与滑动
  bodyBiliBili.addEventListener('mouseenter', (e) => {
    initX = e.pageX
  })
  bodyBiliBili.addEventListener('mousemove', (e) => {
    moveX = e.pageX - initX
    requestAnimationFrame(mouseMove)
  })
  // 鼠标已经离开了视窗或者切出浏览器，执行回正动画
  bodyBiliBili.addEventListener('mouseleave', leave)
  // document.addEventListener("mouseleave", leave)
  window.onblur = leave
  // 添加窗口大小监听
  window.addEventListener('resize', initItems)
}

export default BilibiliJS
