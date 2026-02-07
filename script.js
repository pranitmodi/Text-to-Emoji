const result = document.querySelector("#result")
const result_text = document.querySelector("#result #result-text")
const result_ans = document.querySelector("#result #result-text h3")
const notice = document.querySelector("#notice")

const encrypt = document.querySelector("#option .encrypt")
const decrypt = document.querySelector("#option .decrypt")

let todo = 0

function setNotice(message, type = "") {
  if (!notice) return;
  notice.className = type ? type : "";
  notice.textContent = message;
}

function clearNotice() {
  setNotice("");
}

function hideResult() {
  gsap.to(result, {
    duration: 0.2,
    autoAlpha: 0,
    ease: "power2.out",
    onComplete: () => {
      result.style.display = "none";
    },
  });
}

function showResult() {
  result.style.display = "block";
  gsap.fromTo(
    result,
    { autoAlpha: 0, y: 6 },
    { duration: 0.25, autoAlpha: 1, y: 0, ease: "power2.out" }
  );
}

function animateArrow(isDecryptMode) {
  const rotate = isDecryptMode ? 180 : 0;
  gsap.to("#head .arrow", {
    duration: 0.45,
    rotate,
    x: 0,
    y: 0,
    transformOrigin: "50% 50%",
    ease: "power3.inOut",
  });
}

function runMainAction() {
  document.querySelector("#card #main-btn").click();
}

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

function isSupportedEmojiCodePoint(codePoint) {
  if (
    codePoint === 128169 ||
    codePoint === 129488 ||
    codePoint === 129402 ||
    codePoint === 129400 ||
    codePoint === 129303
  ) {
    return true;
  }

  if (codePoint >= 128577 && codePoint <= 128580) return true;
  if (codePoint >= 128584 && codePoint <= 128586) return true;
  if (codePoint >= 129296 && codePoint <= 129301) return true;
  if (codePoint >= 128512 && codePoint <= 128567) return true;
  if (codePoint >= 129312 && codePoint <= 129317) return true;
  if (codePoint >= 129319 && codePoint <= 129327) return true;
  if (codePoint >= 129392 && codePoint <= 129397) return true;
  return false;
}

function process()
{
    clearNotice();

    const data = document.querySelector("#card #message").value;
    const pass = document.querySelector("#card #password").value;
    const trimmedData = data.trim();
    const trimmedPass = pass.trim();

    let clutter = "";

    if (todo === 0) {
      if (!trimmedData) {
        setNotice("Please enter a message.", "error");
        return "";
      }
      if (!trimmedPass) {
        setNotice("Please set a password.", "error");
        return "";
      }

      const cypher = CryptoJS.AES.encrypt(trimmedData, trimmedPass).toString();
      const sliced = cypher.slice(10); // remove U2FsdGVkX1
      for (let i = 0; i < sliced.length; i++) {
        const dec = sliced.codePointAt(i);
        clutter += toEmoji(dec);
      }
    } else {
      if (!trimmedData) {
        setNotice("Please paste the encrypted emojis.", "error");
        return "";
      }
      if (!trimmedPass) {
        setNotice("Please enter a password.", "error");
        return "";
      }

      let cypher = "U2FsdGVkX1";
      try {
        const symbols = Array.from(trimmedData);
        for (const symbol of symbols) {
          const dec = symbol.codePointAt(0);
          if (!isSupportedEmojiCodePoint(dec)) {
            throw new Error("Unsupported character");
          }
          cypher += toCharacter(dec);
        }

        const bytes = CryptoJS.AES.decrypt(cypher, trimmedPass);
        clutter = bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        clutter = "";
      }

      if (!clutter) {
        setNotice("Something went wrong. Please try again.", "error");
        return "";
      }
    }

    result_ans.innerText = clutter;
    return clutter;

}

encrypt.addEventListener("click",function()
{
    todo = 0
    // console.log("inside encrypt")
    gsap.to(encrypt,
        {
            backgroundColor: "#3a3a3a",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "10px",
        ease: "power3.out"
        })

    gsap.to(decrypt,
        {
            backgroundColor: "#1f1f1f",
            color: "#dadada",
            fontWeight: 400,
            borderRadius: "0px",
        ease: "power3.out"
        })

    animateArrow(false)

    hideResult()
    clearNotice()

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
    // console.log("Decrypt---" + todo)
    // console.log("inside decrypt")
    gsap.to(decrypt,
        {
            backgroundColor: "#3a3a3a",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "10px",
        ease: "power3.out"
        })

    gsap.to(encrypt,
        {
            backgroundColor: "#1f1f1f",
            color: "#dadada",
            fontWeight: 400,
            borderRadius: "0px",
        ease: "power3.out"
        })

    animateArrow(true)

    hideResult()
    clearNotice()

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

    const output = process()

    if (output) {
      showResult()
    } else {
      hideResult()
    }
})

document.querySelector("#card #result #copy-btn").addEventListener("click",function()
{
    // console.log("ander")
    if(result_ans.innerText != "")
    {
        document.querySelector("#card #result #copy-btn").innerHTML = `<i id="copy-btn" class="ri-check-double-line"></i>`

        try {
          navigator.clipboard.writeText(result_ans.innerText)
          setNotice("Copied to clipboard.", "success")
        } catch (error) {
          setNotice("Something went wrong. Please copy manually.", "error")
        }
    }
})

document.querySelector("#card #message").addEventListener("input", clearNotice)
document.querySelector("#card #password").addEventListener("input", clearNotice)

// Keyboard shortcuts
document.querySelector("#card #password").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    runMainAction();
  }
});

document.querySelector("#card #message").addEventListener("keydown", (event) => {
  // Keep normal Enter behavior in textarea, but allow Cmd/Ctrl+Enter to submit.
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    runMainAction();
  }
});

// Ensure result starts hidden but animatable
gsap.set(result, { autoAlpha: 0 })
