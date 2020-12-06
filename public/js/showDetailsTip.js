window.onload = ()=>{
    for (let i = 0; i < $('.details').length; i++) {
        tippy('#details'+i, {
            followCursor: true,
            content: $('#details'+i).attr('data-mdescription')
        })
    }
}


