
    const header = document.querySelector('.header');
    const textContainer = document.querySelector('.text-container');
    const backSky = document.querySelector('.back-sky');
    const backMon = document.querySelector('.back-mon');
    const backPeople = document.querySelector('.back-people');
    const body = document.querySelector('body');

    // 所有元素
    const boms = [backSky, backMon, backPeople, textContainer, header, body];

    //移动信号量
    const status = {
    textContainer: 0,
    header: 0,
    backSky: 0,
    backMon: 0,
    backPeople: 0
}

    let allAnimationsFinished = false; // 标志位，用于判断是否所有动画已完成

    window.addEventListener('wheel', function(e) {
    if (!allAnimationsFinished) { // 如果动画未完成，则阻止默认行为
    e.preventDefault();
}
    if (window.scrollY === 0){
    allAnimationsFinished = false;
}

    // 计算增量
    let delta = e.deltaY;

    // .text-container Y轴移动计算
    let textContainerTransform = parseInt(textContainer.style.transform.split('(')[1]) || 0;
    let newTranslateYTextContainer = Math.max(-640, Math.min(0, textContainerTransform - delta * 3));
    let newOpacityTextContainer = Math.max(0, Math.min(1, 1 - Math.abs(newTranslateYTextContainer) * 0.01));

    if (newTranslateYTextContainer === -640){status.textContainer = 1;}

    textContainer.style.transform = `translateY(${newTranslateYTextContainer}px)`;
    textContainer.style.opacity = String(newOpacityTextContainer);

    // .header X轴移动计算
    let headerTransform = parseInt(header.style.transform.split('(')[1]) || 0;
    let newTranslateYHeader = Math.max(-105, Math.min(0, headerTransform - delta * 0.5));
    let newOpacityHeader = Math.max(0, Math.min(1, 1 - Math.abs(newTranslateYHeader) * 0.01));

    if (newTranslateYHeader === -105){status.header = 1;}


    header.style.transform = `translateX(${newTranslateYHeader}px)`;
    header.style.opacity = String(newOpacityHeader);


    // .back-sky Y轴0.5倍移动计算
    let backSkyTransform = parseInt(backSky.style.transform.split('(')[1]) || 0;
    let newTranslateYBackSky = Math.max(-300, Math.min(0, backSkyTransform - delta * 0.5));

    // .back-mon Y轴0.2倍移动计算
    let backMonTransform = parseInt(backMon.style.transform.split('(')[1]) || 0;
    let newTranslateYBackMon = Math.max(-120, Math.min(0, backMonTransform - delta * 0.2));

    // .back-people Y轴0.2倍移动计算
    let backPeopleTransform = parseInt(backPeople.style.transform.split('(')[1]) || 0;
    let newTranslateYBackPeople = Math.min(50, Math.max(0, backPeopleTransform + delta * 0.2));

    if (newTranslateYBackPeople === 50 && newTranslateYBackMon === -120 && newTranslateYBackSky === -300){
    status.backSky = 1;
    status.backMon = 1;
    status.backPeople = 1;
}else {
    status.backSky = 0;
    status.backMon = 0;
    status.backPeople = 0;
}

    // 背景图移动
    if (status.textContainer === 1 && status.header === 1){
    backSky.style.transform = `translateY(${newTranslateYBackSky}px)`;
    backMon.style.transform = `translateY(${newTranslateYBackMon}px)`;
    backPeople.style.transform = `translateY(${newTranslateYBackPeople}px)`;
}

    // 更新状态部分...
    if (status.backSky === 1 && status.backMon === 1 && status.backPeople === 1 && status.textContainer === 1 && status.header === 1){
    allAnimationsFinished = true; // 所有动画完成
}
}, {passive: false});

    // 添加监听器以检测动画结束并允许页面滚动
    document.addEventListener('scroll', function() {
    if (allAnimationsFinished) {}
}, {passive: true});
