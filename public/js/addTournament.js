$('#addBtn').click(()=>{

    let mName = $('#mName').val()
    let mNumber = $('#mNumber').val()
    let mPlayers = $('#mPlayers').val()
    let mActiveTime = $('#mActiveTime').val()
    let mWinner = $('#mWinner').val()
    let mDescription = $('#mDescription').val()

    $.post('/users/addTournament', {
        mName: mName,
        mNumber:mNumber,
        mPlayers:mPlayers,
        mActiveTime:mActiveTime,
        mWinner:mWinner,
        mDescription:mDescription
    }, (data) =>{
        if(data==='1'){
            //add successfully
            spop({
                template: 'Yah! You have created a tournament!',
                position  : 'Position top left',
                style: 'success',
                autoclose: 2000
            })

            //clear form
            $('input').val('')
            $('textarea').val('')
        }else if(data==='-2'){
            //server error
            spop({
                template: 'Position top left',
                position  : 'top-top-right',
                style: 'error',
                autoclose: 2000,
                    onClose: ()=>{
                        window.location='/users/'
                    }
            })

        }
    })
})