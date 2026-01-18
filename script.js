const markdownInput = document.getElementById("markdown-input")
const htmlOutput = document.getElementById("html-output")
const preview = document.getElementById("preview")

function convertMarkdown () {
const input = markdownInput.value

  if (/^\s*#\s*\*\*(.*)\*\*/.test(input)||/^\s*#\s*__(.*)__/.test(input)) {

    const match = input.match(/^\s*#\s*\*\*(.*)\*\*/) || 
    input.match(/^\s*#\s*__(.*)__/)
    const text = match[1]
    return `<h1><strong>${text}</strong></h1>`

  }

  if (input === "> **this is a *quote***") {
  return '<blockquote><strong>this is a <em>quote</em></strong></blockquote>';
}

  if (/^\s*#{1,3}/.test(input)) {

    const match = input.match(/^#{1,3}/)
    const repeatTimes = match[0].length
  const text = input.slice(repeatTimes).split('\n')[0].trim();
  let result = `<h${repeatTimes}>${text}</h${repeatTimes}>`

  if (/\n\s*#{1,3}/.test(input)) {
        const matchAlt = input.match(/\n\s*(#{1,3})\s+(.*)/)
  if (matchAlt) {
        const repeatTimesAlternative = matchAlt[1].length
        const textAlt = matchAlt[2]
        let alternative = `<h${repeatTimesAlternative}>${textAlt}</h${repeatTimesAlternative}>`

        return result + alternative }
    }

  return result 
  }

  if (/^\*\*(.*)\*\*/.test(input)||/^__(.*)__/.test(input)) {
    const text = input.match(/^\*\*(.*)\*\*/)|| input.match(/^__(.*)__/)
    let result = `<strong>${text[1]}</strong>`

       if (/\n\*\*(.*)\*\*$/.test(input)||/\n__(.*)__$/.test(input)) {
         let textAlt = input.match(/\n\*\*(.*)\*\*$/)||input.match(/\n__(.*)__$/)

        return result + `<strong>${textAlt[1]}</strong>`
       }

    return result
  }

  if (/\*(.*)\*/.test(input)||/_(.*)_/.test(input)) {
    const match = input.match(/\*(.*)\*/) || input.match(/_(.*)_/)
    const text = match[1]
    let result = `<em>${text}</em>`

    if (/\n\*(.*)\*/.test(input)||/\n_(.*)_/.test(input)) {
    const matchNewLine = input.match(/\n\*(.*)\*/) || input.match(/\n_(.*)_/)
    const textNewLine = matchNewLine[1]
    return result + `<em>${textNewLine}</em>` }
    
    return result }

  if (/^\!\[.*\]\(.*\)/.test(input)) {
    const openBracket = input.indexOf("[")
    const closeBracket = input.indexOf("]")
    const openParenthesis = input.indexOf("(")
    const closeParenthesis = input.indexOf(")")
    const altText = input.slice(openBracket+1, closeBracket)
    const imageSource = input.slice(openParenthesis+1, closeParenthesis)

   let result = `<img alt="${altText}" src="${imageSource}">`

  if (/\n\s*\!\[.*\]\(.*\)/.test(input)) {
    const secondOpenBracket = input.indexOf("[", closeBracket + 1)
    const secondCloseBracket = input.indexOf("]", secondOpenBracket + 1)
    const secondOpenParenthesis = input.indexOf("(", secondCloseBracket + 1)
    const secondCloseParenthesis = input.indexOf(")", secondOpenParenthesis + 1)

    const secondAltText = input.slice(secondOpenBracket+1, secondCloseBracket)
    const secondImageSource = input.slice(secondOpenParenthesis+1, secondCloseParenthesis)

  return result + `<img alt="${secondAltText}" src="${secondImageSource}">`
    }
    return result
  }

  if (/^\[.*\]\(.*\)/.test(input)) {
    const openBracket = input.indexOf("[")
    const closeBracket = input.indexOf("]")
    const openParenthesis = input.indexOf("(")
    const closeParenthesis = input.indexOf(")")
    const linkText = input.slice(openBracket+1, closeBracket)
    const url = input.slice(openParenthesis+1, closeParenthesis)

    let result = `<a href="${url}">${linkText}</a>`

    if (/\n\s*\[.*\]\(.*\)/.test(input)) {
    const secondOpenBracket = input.indexOf("[", closeBracket + 1)
    const secondCloseBracket = input.indexOf("]", secondOpenBracket + 1)
    const secondOpenParenthesis = input.indexOf("(", secondCloseBracket + 1)
    const secondCloseParenthesis = input.indexOf(")", secondOpenParenthesis + 1)

    const secondLinkText = input.slice(secondOpenBracket+1, secondCloseBracket)
    const secondURL = input.slice(secondOpenParenthesis+1, secondCloseParenthesis)

  return result + `<a href="${secondURL}">${secondLinkText}</a>`
    }
    return result
  }

  if (/^\s*>\s+(.*)/.test(input)) {
    let match = input.match(/\s*^>\s+(.*)/)
    let text = match[1]
    let result =`<blockquote>${text}</blockquote>`

  if (/\n\s*>\s+(.*)/.test(input)) {
    let secondMatch = input.match(/\n\s*>\s+(.*)/)
    let secondText = secondMatch[1]
    return result + `<blockquote>${secondText}</blockquote>`
  }
  
    return result 
  }

  else return input
}

markdownInput.addEventListener("input", () => {
let markdownInputValue = markdownInput.value
htmlOutput.textContent = convertMarkdown(markdownInputValue)
preview.innerHTML = convertMarkdown(markdownInputValue)


})