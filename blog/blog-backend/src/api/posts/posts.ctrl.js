
import Post from '../../models/post';

let postId = 1; //id의 초깃값

//posts 배열 초기 데이터 
const posts = [
    {
        id: 1, 
        title: '제목',
        body: '내용'
    }
]

/* 포스트 작성 
POST /api/posts 
{ title, body }
*/ 

export const write = async ctx => {
    //REST API의 Request Body는 ctx.request.body에서 조회할 수 있다. 
    const { title, body, tags } = ctx.request.body; 
    const post = new Post({ title, body, tags });
    try {
        await post.save(); 
        ctx.body = post; 
    } catch(e) {
        ctx.throw(500, e)
    }
}

export const list = async ctx => {
    try {
        const posts = await Post.find().exec(); 
        ctx.body = posts; 
    } catch(e) {
        ctx.throw(500, e);
    }
}

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async ctx => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec(); 
        // 포스트가 없으면 올류를 반환한다. 
        if (!post) {
            ctx.status = 404; 
            return; 
        }
        ctx.body = post 
    } catch(e) {
        ctx.throw(500, e)
    }
}


/**
 * 특정 포스트 제거 
 * DELETE /api/posts/:id 
 */
export const remove = async ctx => {
    const { id } = ctx.params; 
    try {
        await Post.findByIdAndRemove(id).exec(); 
        ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
    } catch(e) {
        ctx.throw(500, e) 
    }
}

/** 포스트 수정(교체)
 * PUT /api/posts/:id 
 * { title, body }
 */
export const replace = ctx => {
    // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통째로 교체할 때 사용한다. 
    const { id } = ctx.params; 
    // 해당 id를 가진 posts가 몇 번째인지 확인한다. 
    const index = posts.findINdex(p => p.id.toString() === id) 
        // 포스트가 없으면 오류를 반환한다. 
        if (index == -1) {
            ctx.status = 404; 
            ctx.body = {
                message: '포스트가 존재하지 않습니다.'
            }
            return 
        }
        // 전체 객체를 덮어 씌운다. 
        // 따라서 id를 제외한 기존 정보를 날리고, 객체를 새로 만든다. 
        posts[index] = {
            id, 
            ...ctx.request.body, 
        }
        ctx.body = posts[index]
}


/**
 * 포스트 수정 (특정 필드 변경) 
 * PATCH /api/posts/:id 
 * { title, body }
 */
export const update = async ctx => {
    // PATCH 메서드는 주어진 필드만 교체한다. 
    const { id } = ctx.params; 
    // 해당 id를 가진 post가 몇 번째인지 확인한다. 
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true, // 이 값을 설정하면 업데이트된 데이터를 반환한다. 
            // false 일 때는 업데이트되기 전의 데이터를 반환한다. 
        }).exec(); 
        if (!post) {
            ctx.status = 404; 
            return;
        }
        ctx.body = post; 
    } catch(e) {
        ctx.throw(500, e)
    }
}

