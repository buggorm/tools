const PARA = 1
const QUOTE = 2
const MAXWORDS = 4

function rn(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function gt(iml) {
	let t = []
	for (let i = 0; i < iml/6; i++) {
		let ri = 0
		if (t.length > 0) {
			const li = t[t.length - 1].start + t[t.length - 1].end
			if (li >= iml) {
				break
			}
			ri = rn(li, iml - 1)
		}
		const gap = iml - ri
		const ei = (gap < MAXWORDS && rn(1, gap)) || MAXWORDS
		t.push({
			start: ri,
			type: rn(PARA, QUOTE),
			end: rn(1, ei),
		})
	}

	return t
}

function ztify(im, iml) {
	let m = ''
	let t = gt(iml)
	for (let i = 0; i < iml;) {
		const ti = t.filter(x => x.start === i)[0]
		if (ti) {
			let mw = ''
			for (let j = 0; j < ti.end; j++) {
				mw = (mw + ' ' + im[i + j]).trim()
			}

			switch (ti.type) {
				case PARA:
					mw = `(${mw})`	
					break
				case QUOTE:
					mw = `"${mw}"`
					break
			}
			m = (m + ' ' + mw).trim()
			i += ti.end
		} else {
			m = (m + ' ' + im[i]).trim()
			i++
		}
	}

	if (rn(0, 1) > 0) {
		m = `${m} \;s`
	}

	return m.replace(/\./g, '...')
}


let im = $$('textarea')[0].value.split(' ').filter(e => e !== '')
let iml = im.length
if (iml > 0) {
    let ztm = ztify(im, iml)
    $$('textarea')[0].value = ztm
    $$('input').filter(e => e.defaultValue === 'Skicka')[0].click()
}
