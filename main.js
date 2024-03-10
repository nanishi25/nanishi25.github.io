const awk = {
    migigedan: [64,31,10,73,7,12,52,43,3,46,71,66,100,77,70,18,87,99,35,44,95,60].reverse(),
    migichudan: [39,79,1,91,17,26,5,89,55,86,53,67,2,68,29,76,11].reverse(),
    migijodan: [88,19,25,38,54,98,48,41,4,94,14,59,47,21,63,45,78,93,83].reverse(),
    hidarigedan: [51,6,36,20,22,81,57,74,65,23,13,40,37,32,28,49,27,61,33,15,50],
    hidarichudan: [62,85,8,92,9,96,80,84,90,16,34,97,24,72,82,58,30,69,56,42,75],
    hidarijodan: []
}

const sht = {
    migigedan: [12,7,5,10,34,3,98,48,92,8,80,84,25,74,65,37,40,46,71,87,18,22].reverse(),
    migichudan: [31,64,52,72,24,51,47,85,17,4,60,90,49,27,15,50].reverse(),
    migijodan: [93,83,20,73,99,35,96,9,79,1,69,56,53,86].reverse(),
    hidarigedan: [57,70,77,81,66,100,13,23,88,19,32,28,26,41,89,61,33,91,67,2,38,54],
    hidarichudan: [75,42,30,58,16,82,97,6,62,59,94,43,36,11,76],
    hidarijodan: [39,45,78,63,21,14,55,95,44,68,29]
}

window.addEventListener('DOMContentLoaded', () => {
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const tekijin_field_gedan_list = []
    const tekijin_field_chudan_list = []
    const tekijin_field_jodan_list = []
    const jijin_field_gedan_list = []
    const jijin_field_chudan_list = []
    const jijin_field_jodan_list = []
    const kazuawase_list = []
    const field_list = [tekijin_field_gedan_list,tekijin_field_chudan_list,tekijin_field_jodan_list,kazuawase_list,jijin_field_jodan_list,jijin_field_chudan_list,jijin_field_gedan_list]

    // キャンバス作成
    const width = 44
    const height = 58
    for (const i of _.range(7)) {
        for (const j of _.range(16)) {
            if (i === 3) {
                ctx.fillText(' ', width * i, height * 5)
            } else {
                ctx.fillStyle = 'yellow'
                const region = {
                    x: width * i, y: height * j, w: width, h: height
                }
                ctx.fillRect(region.x, region.y, region.w, region.h)
                field_list[i].push(region)
            }
        }
    }

    // 100首から25首ずつ選ぶ
    /** @type {Array<number>} */
    const song_list = _.shuffle(Array.from({length: 100}, (_, i) => i))
    const choiced_song_tekijin_list = song_list.slice(0, 25)
    const choiced_song_jijin_list = song_list.slice(25, 50)

    const teki_migigedan_list = _.intersection(sht.migigedan, choiced_song_tekijin_list)
    const teki_migichudan_list = _.intersection(sht.migichudan, choiced_song_tekijin_list)
    const teki_migijodan_list = _.intersection(sht.migijodan, choiced_song_tekijin_list)
    const teki_hidarigedan_list = _.intersection(sht.hidarigedan, choiced_song_tekijin_list)
    const teki_hidarichudan_list = _.intersection(sht.hidarichudan, choiced_song_tekijin_list)
    const teki_hidarijodan_list = _.intersection(sht.hidarijodan, choiced_song_tekijin_list)

    const ji_migigedan_list = _.intersection(awk.migigedan, choiced_song_jijin_list)
    const ji_migichudan_list = _.intersection(awk.migichudan, choiced_song_jijin_list)
    const ji_migijodan_list = _.intersection(awk.migijodan, choiced_song_jijin_list)
    const ji_hidarigedan_list = _.intersection(awk.hidarigedan, choiced_song_jijin_list)
    const ji_hidarichudan_list = _.intersection(awk.hidarichudan, choiced_song_jijin_list)
    const ji_hidarijodan_list = _.intersection(awk.hidarijodan, choiced_song_jijin_list)
    
    for (const i in _.range(teki_migigedan_list.length)) {
        const img = new Image(39, 53)
        img.src = `/img/f1s1_${teki_migigedan_list[i].toString().padStart(3, '0')}.jpg`
        const region = tekijin_field_gedan_list[i]
        ctx.drawImage(img, region.x + 5, region.y + 5)
    }
})
