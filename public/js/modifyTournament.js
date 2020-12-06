/**
 * submit btn clicked
 */
$('#modifyBtn').click(()=>{

    let mId = $('#mId').val()
    let mName = $('#mName').val()
    let mNumber = $('#mNumber').val()
    let mPlayers = $('#mPlayers').val()
    let mActiveTime = $('#mActiveTime').val()
    let mDescription = $('#mDescription').val()

    /**
     * Verification starts
     */
    let pass = {
        mName: false,
        mNumber: false,
        mPlayers: false,
        mActiveTime: false,
        mDescription: false
    }


    //tournament name cannot be empty
    mName.trim() !== ''?  pass.mName = true : ''
    //friendly prompt
    if(pass.mName === false) {
        swal("Opps!", "Tournament name cannot be empty!", "error")
        $('#mName').focus()
        return
    }

    //the number of players should be greater than 1
    mNumber >= 2? pass.mNumber = true : ''
    //friendly prompt
    if(pass.mNumber === false) {
        swal("Opps!", "There should be more than 2 players", "error")
        $('#mNumber').focus()
        return
    }

    //the players names should equal to the number of players
    let mPlayersArr = mPlayers.split(',')
    Number(mNumber) === mPlayersArr.length ? pass.mPlayers=true:''
    //friendly prompt
    if(pass.mPlayers === false) {
        swal("Opps!", mNumber +" players are expected to enter!", "error")
        $('#mPlayers').focus()
        return
    }

    //the date cannot be earlier than the day the tournament created
    let mActiveTimeArr = mActiveTime.split('-')
    let startDate = new Date(mActiveTimeArr[0], mActiveTimeArr[1]-1, mActiveTimeArr[2])
    startDate>new Date()? pass.mActiveTime=true:''
    //friendly prompt
    if(pass.mActiveTime === false) {
        swal("Opps!", "The date of tournament cannot be earlier than today", "error")
        $('#mActiveTime').focus()
        return
    }

    //tournament description cannot be empty
    mDescription.trim() !== ''?  pass.mDescription = true : ''
    //friendly prompt
    if(pass.mDescription === false) {
        swal("Opps!", "Please write a brief description for your tournament!", "error")
        $('#mDescription').focus()
        return
    }

    let addable = false
    for(let key in pass){
        if(pass[key]===false){
            return
        }
        addable = true
    }

    if(addable !== true){
        return
    }
    console.log(addable)

    $.post('/matches/modifyTournament', {
        mId:mId,
        mName:mName,
        mNumber:mNumber,
        mPlayers:mPlayers,
        mActiveTime:mActiveTime,
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
                    window.location='/matches'
                }
            })
        }else if(data==='1'){
            //modify successfully
            spop({
                template: 'Congrats! You have modified successfully.',
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

/**
 * cancel btn click
 */
$('#cancelBtn').click(()=>{
    swal({
        title: "Are you sure you want to leave?",
        text: "Once confirmed, you tournament info will not be changed!",
        icon: "warning",
        buttons: true
        // dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                window.location = '/matches'
            } else {
                swal("You can continue modifying your tournament details!");
            }
        })
})