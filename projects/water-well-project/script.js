let toggleLanguageBox = () => {
    let styleProps = document.getElementsByClassName("hiddenLanguageBox")[0].style
    styleProps.display === '' || styleProps.display === 'none'
    ? styleProps.display = 'block'
    : styleProps.display = 'none'
}

let toggleTheme = () => {
    const lightThemePath = 'source/header/configs/light.png';
    const darkThemePath = 'source/header/configs/dark.png';
    let themeIcon = document.getElementById("themeIcon");

    themeIcon.src.includes(lightThemePath)
    ? themeIcon.src = darkThemePath
    : themeIcon.src = lightThemePath;
}

// let toggleMenu = () => {
//     let linksProp = document.getElementsByClassName("links")[0].style
//     if(linksProp.display === '' || linksProp.display === 'none') {
//         linksProp.display = 'block'
//         linksProp.position = 'absolute'
//         linksProp.top = '10vw'
//         linksProp.left = '10vw'
//     } else {
//         linksProp.display = 'none'
//     }

// }