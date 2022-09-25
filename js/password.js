fum.util.password = {
    pasData: '',
    uidData: '',
    resError: 'none',
    meterDiv: '',
    showMeter: false,
    result: '',
    min_len: 8,
    error_str: {
        none: '',
        len: 'Ų·ŁŁ„ ŁŪŁ„ŲÆ ŲØŲ§ŪŲÆ ŲØŲ²ŚÆŲŖŲ± Ų§Ų² Ūø ŲØŲ§Ų´ŲÆ',
        order: 'Ų§Ų² Ś©Ų§Ų±Ų§Ś©ŲŖŲ±Ł‡Ų§Ū Ł…Ų±ŲŖŲØ Ų§Ų³ŲŖŁŲ§ŲÆŁ‡ Ł†Ł†Ł…Ų§ŪŪŲÆ',
        repeat: 'Ų§Ų² Ś©Ų§Ų±Ų§Ś©ŲŖŲ±Ł‡Ų§Ū ŲŖŚ©Ų±Ų§Ų±Ū Ų§Ų³ŲŖŁŲ§ŲÆŁ‡ Ł†Ł†Ł…Ų§ŪŪŲÆ',
        uname: 'Ų§Ų² Ł†Ų§Ł… Ś©Ų§Ų±ŲØŲ±Ū Ų®ŁŲÆ Ų§Ų³ŲŖŁŲ§ŲÆŁ‡ Ł†Ł†Ł…Ų§ŪŪŲÆ',
        weak: 'Ų±Ł…Ų² Ų¹ŲØŁŲ± Ų§Ł†ŲŖŲ®Ų§ŲØŪ Ų´Ł…Ų§ Ł†Ų§Ł…Ł†Ų§Ų³ŲØ Ų§Ų³ŲŖ',
        mediocre: 'Ų±Ł…Ų² Ų¹ŲØŁŲ± Ų§Ł†ŲŖŲ®Ų§ŲØŪ Ų´Ł…Ų§ Ł…Ł†Ų§Ų³ŲØ Ł†ŪŲ³ŲŖ'
    },
    init: function() {},
    drawMeter: function() {
        this.showMeter = true;
        meter_div = document.createElement('div');
        meter_div.id = 'meter';
        this.meterDiv.appendChild(meter_div);

        for (i = 4; i > 0; i--) {
            newdiv = document.createElement('div');
            newdiv.id = 'meter' + i;
            newdiv.style.backgroundColor = 'white';
            meter_div.appendChild(newdiv);
        }
        span = document.createElement('span');
        this.meterDiv.appendChild(span);
    },
    checkPass: function() {
        if (!this.pasData) {
            alert('Ų®Ų·Ų§Ū Ł¾ŪŲ´ ŲØŪŁ†Ū Ł†Ų´ŲÆŁ‡');
            return false;
        }
        str = this.pasData.value;
        //alert(str); 
        this.uname = this.len = this.letter = this.number = this.special = this.repeatchar = this.order = false
        if (this.uidData && this.uidData.value) {
            re = '/' + this.uidData.value + '/i';
            re = eval(re);
            if (str.match(re)) { this.uname = true; }
        }
        if ((str.length > (this.min_len - 1))) { this.len = true; }
        if (str.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) { this.letter = true; }
        if (str.match(/\d+/) && str.match(/[a-z].*/i)) { this.number = true; }
        if (str.match(/[!,@,#,\$,%,^,&,\*,?,_,~]/)) { this.special = true; }
        str_chars = 'abcdefghijklmnopqrstuvwxyz012345678909876543210zyxwvutsrqponmlkjihgfedcba';
        str_chars = '012345678909876543210';
        for (i = 0; i < str_chars.length; i++) { cmd = '/[' + str_chars.substr(i, 1) + ']+/i';
            cmd = eval(cmd); if (str.match(cmd)) { newstr = new String(str.match(cmd)); if (newstr.length > 3) { this.repeatchar = true; } } }
        for (i = 0; i < str_chars.length; i++) { nc = str_chars.substr(i + 1, 3); if (nc.length == 3) { cmd = '/' + str_chars.substr(i, 1) + '(?=' + nc + ')/i';
                cmd = eval(cmd); if (str.match(cmd)) { this.order = true; } } }
        for (i = 0; i < str_chars.length; i++) { nc = str_chars.substr(i + 1, 3); if (nc.length == 3) { cmd = '/' + str_chars.substr(i, 1) + '(?=' + nc + ')/i';
                cmd = eval(cmd); if (str.match(cmd)) { this.order = true; } } }
        str_chars = 'qwertyuiopasdfghjklzxcvbnm012345678909876543210mnbvcxzlkjhgfdsapoiuytrewq';
        for (i = 0; i < str_chars.length; i++) { nc = str_chars.substr(i + 1, 3); if (nc.length == 3) { cmd = '/' + str_chars.substr(i, 1) + '(?=' + nc + ')/i';
                cmd = eval(cmd); if (str.match(cmd)) { this.order = true; } } }
        result = 'weak';
        this.resError = 'none';
        if (this.uname) { this.resError = 'uname';
            result = 'weak'; } else if (this.repeatchar) { this.resError = 'repeat';
            result = 'weak'; } else if (this.order) { this.resError = 'order';
            result = 'weak'; } else if (!this.len) { this.resError = 'len';
            result = 'weak'; } else if (!this.len && !this.letter && !this.number && !this.special) { this.resError = 'weak';
            result = 'weak'; } else if (this.len && !this.letter && !this.number && !this.special) { this.resError = 'mediocre';
            result = 'mediocre'; } else if (this.len && !this.letter && this.number && !this.special) { result = 'strong'; } else if (this.len && !this.letter && !this.number && this.special) { result = 'strong'; } else if (this.len && this.letter && !this.number && !this.special) { result = 'strong'; } else if (this.len && !this.letter && this.number && this.special) { result = 'strongest'; } else if (this.len && this.letter && !this.number && this.special) { result = 'strongest'; } else if (this.len && this.letter && this.number && !this.special) { result = 'strongest'; } else if (this.len && this.letter && this.number && this.special) { result = 'strongest'; } else { result = 'weak'; }
        this.result = result;
        if (this.showMeter) this.drawResult();
    },
    getErrorMes: function() {
        return this.error_str[this.resError];
    },
    drawResult: function() { //#4AE817
        bgcolor = '#25F8E9';
        boxes = 0; // alert(this.uname+"-"+this.repeatchar+"-"+this.order+"-"+this.len+"-"+this.letter+"-"+this.number+"-"+this.special); 
        switch (this.result) {
            case 'strongest':
                boxes = 4;
                break;
            case 'strong':
                boxes = 3;
                break;
            case 'mediocre':
                boxes = 2;
                break;
            case 'weak':
                boxes = 1;
                break;
        }
        var ob;
        for (i = 1; i < 5; i++) {
            ob = document.getElementById('meter' + i)
            if (ob) {
                if (i > boxes) { bgcolor = 'white'; }
                ob.style.backgroundColor = bgcolor
            }
        }
    }


}