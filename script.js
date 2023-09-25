let result = document.querySelector("#result")
let result_text = document.querySelector("#result #result-text")
let result_ans = document.querySelector("#result #result-text h3")

let encrypt = document.querySelector("#option .encrypt")
let decrypt = document.querySelector("#option .decrypt")

let todo = 0

function toEmoji(dec) 
{ //map ascii printable characters to specific emoji faces
    if (dec == 32) 
    {
      return (String.fromCodePoint(128169));
    }
    else if (dec == 33) 
    {
      return (String.fromCodePoint(129488));
    }
    else if (dec == 34) {
      return (String.fromCodePoint(129402));
    }
    else if (dec == 35) {
      return (String.fromCodePoint(129400));
    }
    else if (dec == 36) {
      return (String.fromCodePoint(129303));
    }
    else if (dec <= 39) {
      return (String.fromCodePoint(dec + 128547));
    }
    else if (dec <= 43) {
      return (String.fromCodePoint(dec + 128537));
    }
    else if (dec <= 49) {
      return (String.fromCodePoint(dec + 129252));
    }
    else if (dec <= 105) {
      return (String.fromCodePoint(dec + 128462));
    }
    else if (dec <= 111) {
      return (String.fromCodePoint(dec + 129206));
    }
    else if (dec <= 120) {
      return (String.fromCodePoint(dec + 129207));
    }
    else 
    {
      return (String.fromCodePoint(dec + 129271));
    }
}
  
function toCharacter(dec) 
{
    if (dec == 128169) 
    {
      return (String.fromCodePoint(32));
    }
    else if (dec == 129488) 
    {
      return (String.fromCodePoint(33));
    }
    else if (dec == 129402) 
    {
      return (String.fromCodePoint(34));
    }
    else if (dec == 129400) {
      return (String.fromCodePoint(35));
    }
    else if (dec == 129303) {
      return (String.fromCodePoint(36));
    }
    else if (dec >= 129392) {
      return (String.fromCodePoint(dec - 129271));
    }
    else if (dec >= 129319) {
      return (String.fromCodePoint(dec - 129207));
    }
    else if (dec >= 129312) {
      return (String.fromCodePoint(dec - 129206));
    }
    else if (dec >= 129296) {
      return (String.fromCodePoint(dec - 129252));
    }
    else if (dec >= 128584) {
      return (String.fromCodePoint(dec - 128547));
    }
    else if (dec >= 128577) {
      return (String.fromCodePoint(dec - 128537));
    }
    else 
    {
      return (String.fromCodePoint(dec - 128462));
    }
}

function process()
{
    let data = document.querySelector("#card #message").value
    let pass = document.querySelector("#card #password").value

    let clutter = ""

    if(todo == 0)
    {
        var cypher = CryptoJS.AES.encrypt(data,pass).toString();
        var sliced = cypher.slice(10);//remove U2FsdGVkX1
        for (var i = 0; i < sliced.length; i++) 
        {
            var dec = sliced.codePointAt(i);
            clutter += toEmoji(dec);
        }
    }
    else
    {
      console.log("Doing DECRYPTION")
      data.replace(/[0-9]/g, '');
      console.log(data)
      var cypher = 'U2FsdGVkX1';
      try 
      {
        console.log("okay")
          //build cyphertext
          for (var i = 0; i < data.length/2; i++) 
          {
              var dec = data.codePointAt(i * 2);
              cypher = cypher + toCharacter(dec);
          }
          //decrypt
          var bytes  = CryptoJS.AES.decrypt(cypher,pass);
          console.log("bytes: " + bytes)
          clutter = bytes.toString(CryptoJS.enc.Utf8);
          console.log("clutter" + clutter)
      } 
      catch (error) 
      {
          clutter = '';
      }
    }
    
    result_ans.innerText = clutter

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

    document.querySelector("#card #message").value = ""
    document.querySelector("#card #password").value = ""
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
    console.log("Decrypt---" + todo)
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

    document.querySelector("#card #message").value = ""
    document.querySelector("#card #password").value = ""
    document.querySelector("#text1").innerText = `1. Type the encrypted message`
    document.querySelector("#text2").innerText = `2. Enter the password`
    document.querySelector("#text3").innerText = `3. Decrypt Emojis`
    document.querySelector("#text4").innerText = `Decrypted Text:`
    document.querySelector("#main-btn").innerHTML = `<i class="ri-lock-unlock-line"></i> Decrypt Emojis`
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
