import Post from './models/post';

export default function createFakeData() {
    // 0, 1, ...39로 이루어진 배열을 생성한 후 포스트 데이터로 변환 
    const posts = [...Array(40).keys()].map(i => ({
        title: `포스트 #${i}`, 
        // https://www.lipsum.com/에서 복사한 200자 이상의 텍스트 
        body: 
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id cursus ipsum. Etiam aliquet ex magna, eu luctus sem tincidunt eget. Proin placerat nec quam et faucibus. Donec eu quam elementum, tristique eros a, tempor magna. Nam tempor lobortis sem, sodales suscipit nunc laoreet a. Quisque vel malesuada massa. Morbi et felis ullamcorper, placerat odio a, molestie erat. Nullam id augue leo. Curabitur eu faucibus eros. Mauris dui velit, pulvinar vel lectus ac, aliquet euismod diam. Proin lobortis tincidunt mi, ac aliquet urna. Nam vestibulum justo et libero imperdiet, id tincidunt risus blandit. Proin commodo pharetra lacus vitae convallis. Maecenas tortor leo, aliquet sagittis mi id, sollicitudin placerat libero. Maecenas dapibus, augue ut pellentesque facilisis, dui nulla mollis mi, nec rhoncus turpis nisi et arcu. Donec vestibulum fermentum turpis, eget tempor lacus consectetur iaculis. Donec eget auctor dolor, et hendrerit ante. In cursus lacus quis dui convallis euismod. Nulla a hendrerit magna, vitae tempor ipsum. Sed augue lacus, imperdiet id lacinia et, elementum sagittis tortor. Proin id libero sit amet odio euismod vehicula. Vestibulum vitae vestibulum velit. Aliquam sollicitudin, nulla id finibus suscipit, turpis lorem cursus massa, ut ornare lacus purus eu elit. Nullam porttitor pharetra enim tincidunt congue. Cras hendrerit semper purus vel euismod. Ut consectetur tellus risus, sed elementum odio accumsan quis. Phasellus tristique feugiat magna, quis auctor tortor lacinia id. Nulla ut blandit magna.',
        tags: ['가짜', '데이터']
    }))

    Post.insertMany(posts, (err, docs) => {
        console.log(docs)
    })
}