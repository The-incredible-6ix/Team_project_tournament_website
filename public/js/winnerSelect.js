window.onload = ()=>{
    for (let i = 0; i < $('select').length; i++) {
        $('#mWinner'+i).change(()=>{
            let mWinner = $('#mWinner'+i).children('option:selected').val()
            if(mWinner==='default'){
                return
            }

            //send ajax, decide the winner
            $.post('/matches/winnerSelect', {
                mId:$('#mWinner'+i).attr('mId'),
                mWinner:mWinner,
            },(data) => {
                if(data==='-2'){
                    //server error
                    spop({
                        template: 'Oops! It looks like there is something wrong with the server. Please try again.',
                        position  : 'top-top-right',
                        style: 'error',
                        autoclose: 2000,
                        onClose: ()=>{
                            window.location='/matches'
                        }
                    })
                }else if(data==='1'){
                    //modify successfully
                    spop({
                        template: 'Congrats! Winner selected!',
                        position  : 'top-top-right',
                        style: 'success',
                        autoclose: 2000,
                        onClose: ()=>{
                            window.location='/matches'
                        }
                    })
                }
            })
        })
    }
}
