export function competeTaskChime() {
  const snd = new Audio(
    'data:audio/mpeg;base64,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cR68nAT59azaqxmTA6m/////////////+g2UAAAJgAAxmqGCGqoeEgsmBVWkglRLMNgU+wWi6oiCRhFunVb0YXC5cBYil5MIW0BrROJMtNXUNcR0ms83UdMRzB6b///////////79qbi1wmLJRalMWirTkwTBsSDa6JjLkAAqEZg0EZxCaMSKASMUgJPtgTFjMCATRvIBRqUjqkWMu/ZzwUTRS0dqBmGuOf//////////v/7UsRLg0o4YR8u8kcBRQwjRdxByt71IQMYWLgdLQLASyAsAAGHaj/rsLNgoaHnZwagDRggRAwRHmnEkQOBMwO+Dqd/MHhZjL5qwlc2+jRQDK+7eoMAAzpf5Q4QwfP///////////1222UuCCBYXDjgVhN6IMMCYMAwxMkqTMGwrAoCjQjGrKLkwHmAQAGGZHnL6KGHoFg4BFAEex4CXkAEcCq7/oDvARxus8aV7nAezX////////////v2VHwKwPEaIAqgAABlM3KV9kbRGFjc//tSxFgBSdxhHM5hTkFGjCOI/rSoHGMsgZI8wwKzc0aLQgUAGIkCcAFAChZXFBrAlWP6E+Tt/soaoYwNZOGr1oFMuiwjfd///////////9fHraeYXGlQAsBlDAuHF/gYAHexAaKABgIICElGna+SgQVCJghlG8piYMCCJ7E1qEQSb8ECIei6CuyyGBxpopJ/Y6JUz///////////RvTExQa1MRqMqkA3QTcMOGjYIw1NGI5MVwlMBQJMGQ/C7EA4AyYCDD0Dg1cyYixIAFoJ3wX/+1LEZYBKEF8e7nYsQT0Lo5huQHDEmcIxUv1CsAnu/ocBTGv//////////6POlzzQdGLD6VCgHSVcDKrWoYMWyBQmMYIgMNhJnIGIBqqTjwBGQQMNsyZBhgGsgHYKkDIMAJYdy2/lMO0nb1HUBZp//////0f/////+0XJUPCAkXWMAAADGtyenW+CAyc5ho80QsDDBoQOGuJLNXZioPHFQmhgwIbsrXg16nAGIUE2+xwD6CmJuaNXsYh8Pf//////////q9K3VgR1gmWlGfJfDv/7UsRzg0noYRougVIBHIvjid5E2DX0TDCovPLW00eGTBIfEIpPJMcIBhADzA70Ocy0wiDm4wpapQE2+ctAl29sDUyr+pIYMs///////////6Dg3IB0IAMDg0XEQRPj1eQADVDUiboJviAODF2ADCQWLwA4KHLR4hGgEMNk09KmgMQ0fGsMrVDIAB2HCk31LFQQVSnf01BWm////////////o18ehYhOGJBkMa1LTRFaQIFJs/OmRgCSgAwOBAeMEuUTjBxlO3IwIGLfSVwluQ6//tSxIYDSXhdHG51rEE6C+MFwDZAEkiav9IQM9b+tEOFX///////////qQNcvSImF2PhdQBegAHeZzkXaALA45UGwFvg0RLAmf+grqR3AjkdNpggAZW/7qJRQtPVQukz/ULoVjTVvUmIEaf///////////I4q6u0gEUpJJIDUFiVtYSrAgSNb5YxYEgYAgcCDcBsb18jCICO7hoiG7TH0eOW3BiBDIH6XegCZNFJ/VGOQf//////////+pnebcQcH1BEPpUALSESTGNBXmo62If/+1LEloNJOF8cTvGnARcL44nIMhgCJlG/mYArPjCww7eDo1HhRZOUjkAscvRZcMgDELaft04zA72U/6hpb//V/s/xD1WanRefIaU//6CtNLmoNTxo0YSudgBJyXNCFGQC5YHFDkAw3wDQWAAKwNWLgXKILgYKHQHGEuAcHA1WMuMoH2J8O8bLP0e9McS/+g//+vtf//////+399O26zyK5jGuV2EiISoAUASVOE2MoHRgIEAG9bIBkIJAAAIAQRAZ3aYkAciBgkjAdFHYEhMMAv/7UsSsgEkQYRzObadBIAvjmA40OMDGjbJ4RkPB1L+dHmr+sy/+r/Z1////////+kqnyoRWKrSUGSTozBUeHY1KtBBKqQgFZD5zFBFlwKKzKNxItEAGs5q9MXvciHIHVDCJe9ufJvkAd/52/////////b/RG9f3/dk2/9P////S15boalyMdXQ55yKUlDnBDEIOxKrLdizImumCgh7n4PUwjBTCAEx65VAp8BDJyoJkQgbeG4IlVK+M7vifoO//X//////b/q39uifa+v6e3RPT//tSxMICCfhdHO5tpwE5tOMFUAtZ+////6W/MiUnQ4w5nmNYw4ZmMczLVgpV/3OU8Ya+YEBH0zBoAADAQhBjY45fy+R1SM/Z1KpLHWSuW0Tf6t9Tf+n///////r/9df7+b+9at2fX/////enWrSN3MRWflOHCB6HVDs4Y+cAIaiAAG6CvMR9kAXD5nq6mChaY4cBnLObZncMFBT7zIWD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'
  )
  snd.play()
}
