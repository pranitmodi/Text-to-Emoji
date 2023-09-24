let result = document.querySelector("#result")
let result_text = document.querySelector("#result #result-text")
let result_ans = document.querySelector("#result #result-text h3")

let encrypt = document.querySelector("#option .encrypt")
let decrypt = document.querySelector("#option .decrypt")

let todo = 0

function asciiToEmoji(asciiValue) 
{
    return String.fromCodePoint(parseInt(asciiValue, 10));
}
function emojiToAscii(emoji) 
{
    const codePoint = emoji.codePointAt(0);
    return codePoint.toString();
}
  

function process()
{
    let data = document.querySelector("#card #message").value
    let pass = document.querySelector("#card #password").value

    let clutter = ""
    const str = data.split("")
    
    console.log("data:" + data)

    if(todo == 0)
    {
        str.forEach(element => 
        {   
            clutter += `&#128${element.charCodeAt()}`
        });
        const str1 = clutter.split("")
        str1.forEach(element => 
        {   
            console.log(element)
        });
    }
    else
    {
        str.forEach(ele =>
        {
            console.log(ele.charCodeAt(0))
        })
    }

    console.log(clutter)
    result_ans.innerHTML = String.fromCharCode(568344)
}

encrypt.addEventListener("click",function()
{
    todo = 0
    console.log("inside encrypt")
    gsap.to(encrypt,
        {
            backgroundColor: "#3a3a3a",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "10px",
            ease:Power3
        })

    gsap.to(decrypt,
        {
            backgroundColor: "#1f1f1f",
            color: "#dadada",
            fontWeight: 400,
            borderRadius: "0px",
            ease:Power3
        })

    gsap.to("#head .arrow",
    {
        duration:1,
        rotate:0
    })

    result.style.display = "none"

    document.querySelector("#text1").innerText = `1. Type a message`
    document.querySelector("#text2").innerText = `2. Set a password`
    document.querySelector("#text3").innerText = `3. Encrypt message`
    document.querySelector("#text4").innerText = `Encrypted Text:`
    document.querySelector("#main-btn").innerHTML = `<i class="ri-lock-line"></i> Encrypt Text`
    result_ans.innerText = ""
})

decrypt.addEventListener("click",function()
{
    todo = 1
    console.log("inside decrypt")
    gsap.to(decrypt,
        {
            backgroundColor: "#3a3a3a",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "10px",
            ease:Power3
        })

    gsap.to(encrypt,
        {
            backgroundColor: "#1f1f1f",
            color: "#dadada",
            fontWeight: 400,
            borderRadius: "0px",
            ease:Power3
        })

    gsap.to("#head .arrow",
    {
        duration:1,
        rotate:180
    })

    result.style.display = "none"

    document.querySelector("#text1").innerText = `1. Type the encrypted message`
    document.querySelector("#text2").innerText = `2. Enter the password`
    document.querySelector("#text3").innerText = `3. Decrypt Emojis`
    document.querySelector("#text4").innerText = `Decrypted Text:`
    document.querySelector("#main-btn").innerHTML = `<i class="ri-lock-unlock-line"></i> Decrypt Text`
    result_ans.innerText = ""
})

document.querySelector("#card #main-btn").addEventListener("click",function()
{
    document.querySelector("#card #result #copy-btn").innerHTML = `<i class="ri-file-copy-line"></i>`         

    process()

    result.style.display = "block"
})

document.querySelector("#card #result #copy-btn").addEventListener("click",function()
{
    console.log("ander")
    if(result_ans.innerText != "")
    {
        document.querySelector("#card #result #copy-btn").innerHTML = `<i id="copy-btn" class="ri-check-double-line"></i>`

        console.log("Copied: " + `${result_ans.innerText}`)
        navigator.clipboard.writeText(result_ans.innerText)
    }
})