$('#modifyBtn').click(()=>{
    console.log(123)

    let mId = $('#mId').val()
    let mName = $('#mName').val()
    let mNumber = $('#mNumber').val()
    let mPlayers = $('#mPlayers').val()
    let mActiveTime = $('#mActiveTime').val()
    let mWinner = $('#mWinner').val()
    let mDescription = $('#mDescription').val()

    $.post('/users/modifyTournament', {
        mId:mId,
        mName:mName,
        mNumber:mNumber,
        mPlayers:mPlayers,
        mActiveTime:mActiveTime,
        mWinner:mWinner,
        mDescription:mDescription
    },(data) => {
        if(data==='-2'){
            //server error
            spop({
                template: 'Oops! It looks like there is something wrong with the server. Please try again.',
                position  : 'top-top-right',
                style: 'error',
                autoclose: 2000,
                onClose: ()=>{
                    window.location='/users/'
                }
            })
        }else if(data==='1'){
            //modify successfully
            spop({
                template: 'Congrad! You have modified successfully.',
                position  : 'top-top-right',
                style: 'success',
                autoclose: 2000,
                onClose: ()=>{
                    window.location='/users/'
                }
            })
        }
    })
})