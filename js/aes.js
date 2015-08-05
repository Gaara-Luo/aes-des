var roundNumber = 10, // 10轮加密
    keyNumber = 4; //输入密钥的 word 个数

var s_box = [
  [0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5,
   0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76],
  [0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0,
   0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0],
  [0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC,
   0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15],
  [0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A,
   0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75],
  [0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0,
   0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84],
  [0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B,
   0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF],
  [0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85,
   0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8],
  [0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5,
   0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2],
  [0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17,
   0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73],
  [0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88,
   0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB],
  [0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C,
   0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79],
  [0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9,
   0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08],
  [0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6,
   0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A],
  [0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E,
   0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E],
  [0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94,
   0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF],
  [0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68,
   0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16]];

var inv_s_box = [
    [0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38,
        0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB],
    [0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87,
        0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB],
    [0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D,
        0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E],
    [0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2,
        0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25],
    [0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16,
        0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92],
    [0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA,
        0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84],
    [0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A,
        0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06],
    [0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02,
        0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B],
    [0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA,
        0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73],
    [0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85,
        0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E],
    [0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89,
        0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B],
    [0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20,
        0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4],
    [0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31,
        0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F],
    [0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D,
        0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF],
    [0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0,
        0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61],
    [0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26,
        0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D]];

var r_con = [0x01000000, 0x02000000, 0x04000000, 0x08000000, 0x10000000,
    0x20000000, 0x40000000, 0x80000000, 0x1b000000, 0x36000000];



/*
 * S盒变换
 * 输入是按照列优先输入到4*4的数组中
 * 输入输出: 长度为16的数组
 */
function subBytes (m) 
{
	var subBytesShow = [];
	for (var i = 0; i < 16; ++i) 
	{
        var temp = m[i];
        var row = gain(temp,7)*8 + gain(temp,6)*4 + gain(temp,5)*2 + gain(temp,4),
            col = gain(temp,3)*8 + gain(temp,2)*4 + gain(temp,1)*2 + gain(temp,0);
        m[i] = s_box[row][col];
		subBytesShow[i] = m[i].toString(16);
		if(subBytesShow[i].length == 1)
			subBytesShow[i] = '0' + subBytesShow[i];
    }
	transform(subBytesShow);
	return subBytesShow;
}

/*
 * 行变换
 * 输入输出: 长度为16的数组
 */
function shiftRows(m) 
{
    var shiftRowsShow = [];
	// 第二行循环左移一位
    var temp = m[4];
    for (var i = 0; i < 3; ++i) {
        m[i + 4] = m[i + 5]
    }
    m[7] = temp;

    // 第三行循环左移两位
    for (var i = 0; i < 2; ++i) {
        temp = m[i + 8];
        m[i + 8] = m[i + 10];
        m[i + 10] = temp;
    }

    // 第四行循环左移三位
    temp = m[15];
    for(var i = 3; i > 0; --i) {
        m[i + 12] = m[i + 11];
    }
    m[12] = temp;
	
	for(var i = 0; i < 16; i++)
	{
		shiftRowsShow[i] = m[i].toString(16);
		if(shiftRowsShow[i].length == 1)
			shiftRowsShow[i] = '0' + shiftRowsShow[i];
	}
	transform(shiftRowsShow);
	return shiftRowsShow;
	
}

/*
 * 有限域上的乘法 GF(2^8)
 */
function multiplication (a, b) 
{
    var p = 0,c;
    for (var i = 0; i < 8; i++) 
	{
        if ((b & 1) != 0) 
		{
            p ^= a
        }
        c = (a & 0x80);
        a <<= 1;
        if (c != 0) 
		{
            a ^= 0x1b
        }
        b >>= 1
    }
    return p
}

/*
 * 列变换
 * 输入输出: 长度为16的数组
 */
function mixColumns(m) {
    var mixColumnsShow = [];
	var arr = new Array(4);
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            arr[j] = m[i + j * 4]
        }

        m[i] = (multiplication(0x02, arr[0]) ^ multiplication(0x03, arr[1]) ^ arr[2] ^ arr[3])%256;
        m[i+4] = (arr[0] ^ multiplication(0x02, arr[1]) ^ multiplication(0x03, arr[2]) ^ arr[3])%256;
        m[i+8] = (arr[0] ^ arr[1] ^ multiplication(0x02, arr[2]) ^ multiplication(0x03, arr[3]))%256;
        m[i+12] = (multiplication(0x03, arr[0]) ^ arr[1] ^ arr[2] ^ multiplication(0x02, arr[3]))%256;
    }
	for(var i = 0; i < 16; i++)
	{
		mixColumnsShow[i] = m[i].toString(16);
		if(mixColumnsShow[i].length == 1)
			mixColumnsShow[i] = '0' + mixColumnsShow[i];
	}
	transform(mixColumnsShow);
	return mixColumnsShow;
}

/*
 * 将每一列与扩展密钥进行异或
 * 输入输出: 长度为16的数组、长度为4的key数组
 */
function addRoundKey (m, k) {
    for (var i = 0; i < 4; ++i) {
        var k1 = k[i] >>> 24,
            k2 = (k[i] << 8) >>> 24,
            k3 = (k[i] << 16) >>> 24,
            k4 = (k[i] << 24) >>> 24;

        m[i] = m[i] ^ k1;
        m[i+4] = m[i+4] ^ k2;
        m[i+8] = m[i+8] ^ k3;
        m[i+12] = m[i+12] ^ k4;
    }
}

/*
 * 加密主函数
 * 输入输出: 长度为16的数组、长度为4*(roundNumber+1)的数组
 */
function aesEncrypt(input, w) {
	
	//设置显示的控件为空
	aesSubBytesShow.value = "";
	aesShiftRowsShow.value = "";
	aesMixColumnsShow.value = "";
	aesKeys.value = "";
	
	//定义AES构件组
	var subKey = [];
	var subBytesShow = [];
	var mixColumnsShow = [];
	var shiftRowsShow = [];
	for(var i=0; i<11; i++)
		subKey[i] = [];
	var key = new Array(4);
    for (var i = 0; i < 4; ++i) {
        key[i] = w[i];
		subKey[0][i] = key[i].toString(16);
		for(var cnt = 0; cnt < 8-subKey[0][i].length;cnt++)
			subKey[0][i] = '0' + subKey[0][i];
    }
	transform(input);
    addRoundKey(input, key);
    for (var round = 1; round < roundNumber; ++round) {
        subBytesShow[round-1] = subBytes(input);
        shiftRowsShow[round-1] = shiftRows(input);
        mixColumnsShow[round-1] = mixColumns(input);
        for (var i = 0; i < 4; ++i) {
            key[i] = w[4 * round + i];
			subKey[round][i] = key[i].toString(16);
			for(var cnt = 0; cnt < 8-subKey[round][i].length;cnt++)
				subKey[round][i] = '0' + subKey[round][i];
        }
		
		
		addRoundKey(input, key);
    }
	
    subBytesShow[9] = subBytes(input);
    shiftRowsShow[9] = shiftRows(input);
    for (var i = 0; i < 4; ++i){
        key[i] = w[4 * roundNumber + i];
		if(key[i].length == 1)
		{
			key[i] = '0' + key[i];
		}
		subKey[10][i] = key[i].toString(16);
    }
	
	// 将AES的构件组读到代显示的控件中
	var k = [];
	for(var i=0; i<11; i++)
	{
		k[i] = "key" + i + ": " +subKey[i].join("");
		aesKeys.value += k[i] + "\n";
	}
	for(var i=0; i<10; i++)
	{
		k[i] = "subBytes[" + i + "]: " +subBytesShow[i].join("");
		aesSubBytesShow.value += k[i] + "\n";
	}
	for(var i=0; i<9; i++)
	{
		k[i] = "mixColumns[" + i + "]: " +mixColumnsShow[i].join("");
		aesMixColumnsShow.value += k[i] + "\n";
	}
	for(var i=0; i<10; i++)
	{
		k[i] = "shiftRows[" + i + "]: " +shiftRowsShow[i].join("");
		aesShiftRowsShow.value += k[i] + "\n";
	}
    addRoundKey(input, key);
	transform(input);
}



/*
 * 逆S盒变换
 * 输入输出: 长度为16的数组
 */
function invSubBytes (m) {
    for(var i = 0; i < 16; ++i) {
        var temp = m[i];
        var row = gain(temp,7)*8 + gain(temp,6)*4 + gain(temp,5)*2 + gain(temp,4),
            col = gain(temp,3)*8 + gain(temp,2)*4 + gain(temp,1)*2 + gain(temp,0);
        m[i] = inv_s_box[row][col];
    }
}

/*
 * 逆行变换
 * 以字节为单位循环右移
 * 输入输出: 长度为16的数组
 */
function invShiftRows(m) {
    // 第二行循环右移一位
    var temp = m[7];
    for (var i = 3; i > 0; --i) {
        m[i + 4] = m[i + 3];
    }
    m[4] = temp;

    // 第三行循环右移两位
    for (var i = 0; i < 2; ++i) {
        temp = m[i + 8];
        m[i + 8] = m[i + 10];
        m[i + 10] = temp;
    }

    // 第四行循环右移三位
    temp = m[12];
    for (var i = 0; i < 3; ++i) {
        m[i + 12] = m[i + 13];
    }
    m[15] = temp;
}

/*
 * 逆列变换
 * 输入输出: 长度为16的数组
 */
function invMixColumns (m) {
    var arr = new Array(4);
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            arr[j] = m[i + j * 4];
        }

        m[i] = (multiplication(0x0e, arr[0]) ^ multiplication(0x0b, arr[1]) ^ multiplication(0x0d, arr[2]) ^ multiplication(0x09, arr[3]))%256;
        m[i+4] = (multiplication(0x09, arr[0]) ^ multiplication(0x0e, arr[1]) ^ multiplication(0x0b, arr[2]) ^ multiplication(0x0d, arr[3]))%256;
        m[i+8] = (multiplication(0x0d, arr[0]) ^ multiplication(0x09, arr[1]) ^ multiplication(0x0e, arr[2]) ^ multiplication(0x0b, arr[3]))%256;
        m[i+12] = (multiplication(0x0b, arr[0]) ^ multiplication(0x0d, arr[1]) ^ multiplication(0x09, arr[2]) ^ multiplication(0x0e, arr[3]))%256;
    }
}

/*
 * 解密主函数
 * 输入输出: 长度为16的数组、长度为4*(roundNumber+1)的数组
 */
function aesDecrypt(input, w) {
	var key = new Array(4);
    for (var i = 0; i < 4; ++i) {
        key[i] = w[4 * roundNumber + i];
    }
	transform(input);
    addRoundKey(input, key);

    for(var round = roundNumber - 1; round > 0; --round) {
        invShiftRows(input);
        invSubBytes(input);
        for (var i = 0; i < 4; ++i) {
            key[i] = w[4 * round + i];
        }
        addRoundKey(input, key);
        invMixColumns(input);
    }

    invShiftRows(input);
    invSubBytes(input);
    for (var i = 0; i < 4; ++i) {
        key[i] = w[i];
    }
    addRoundKey(input, key);
	transform(input);
}


/*
 * 4个byte转为1个word
 * 输入输出: 4个8位数
 */
function word (byte1, byte2, byte3, byte4) {
    var result = 0x0;

    for (var i in arguments) {
        result <<= 8;
        result += arguments[i];
    }

    return result >>> 0;
}

/*
 * 循环左移一位
 * 输入:[a0, a1, a2, a3] 
 * 输出: [a1, a2, a3, a0]
 */
function rotWord (rw) {
    var high = rw << 8,
        low = rw >>> 24;
    return (high | low) >>> 0;
}

/*
 * 对输入[a0, a1, a2, a3] 中的每一个字节进行S-盒变换
 * 输入输出: 32位数
 */
function subWord (sw) {
    var temp = new Array(32 + 1).join('0').split('');

    sw = fill(sw, 32);
    for (var i = 0; i < 32; i += 8) {
        var row = parseInt(sw[31-(i+7)], 16) * 8
                + parseInt(sw[31-(i+6)], 16) * 4
                + parseInt(sw[31-(i+5)], 16) * 2
                + parseInt(sw[31-(i+4)], 16);
        var col = parseInt(sw[31-(i+3)], 16) * 8
                + parseInt(sw[31-(i+2)], 16) * 4
                + parseInt(sw[31-(i+1)], 16) * 2
                + parseInt(sw[31-(i)], 16);
        var val = fill(s_box[row][col], 8);
        for (var j = 0; j < 8; ++j) {
            temp[31-(i+j)] = val[7-j] || 0
        }
    }

    var result = "";
    for (var i in temp) {
        result += temp[i];
    }
    return parseInt(result, 2)
}

/*
 * 密钥扩展
 * 对128位密钥进行扩展得到长度为4*(roundNumber+1)的数组
 * 输入: 长度为4*keyNumber的数组
 * 输出: 长度为4*(roundNumber+1)的数组
 */
function keyExpansion(key) {
    var temp;
	var w = new Array(4 * (roundNumber + 1) + 1).join('0').split('');
    for (var i = 0; i < keyNumber; ++i) {
        w[i] = word(
            key[4 * i],
            key[4 * i + 1],
            key[4 * i + 2],
            key[4 * i + 3]
        );
    }

    for (var i = keyNumber; i < 4 * (roundNumber + 1); ++i) {
        temp = w[i-1];
        if (i % keyNumber == 0) {
            w[i] = w[i - keyNumber] ^ subWord(rotWord(temp)) ^ r_con[i / keyNumber - 1]
        } else {
            w[i] = w[i - keyNumber] ^ temp;
        }
        w[i] >>>= 0
    }
    return w

}


/*
 * 获取num从右往左第k位的二进制数
 * 输入：num: 需要获取的数，k: 第k位
 * 输出：获取的二进制数
 */
function gain(num, k) {
    return (num >>> k) - ((num >>> (k+1)) << 1);
}

/*
 * 按位补齐0
 * 输入：num: 16进制数，length: 需要扩展的长度
 * 输出：扩展后的字符串
 */
function fill (num, length) {
    num = num.toString(2);
    var temp = "";
    for (var i = 0; i < length; i++) {
        temp += '0'
    }
    return temp.substr(0, length - num.length) + num;
}

/*
 * 矩阵转置
 * 输入：m: 16进制数
 * 输出：转置后的字符串
 */
function transform (m) {
    function swap (a, b) {
        var temp;
        temp = m[a]; m[a] = m[b]; m[b] = temp;
    }

    swap(1,4);
    swap(2,8);
    swap(3,12);
    swap(6,9);
    swap(7,13);
    swap(11,14);
}

/*
 *点击“加密”按钮的事件响应
 */
function clickEncrypt()
{
	var keytext = aesEkeytext.value;
	var key = [];
	for(var i=0; i < 16; i++)
	{
		key[i] = parseInt(keytext.slice(i*2,i*2+2),16);
	}
	var w = keyExpansion(key);
	var plaintext = aesEplaintext.value;
	if(!(/^[0-9a-f]*$/.test(keytext))||!(/^[0-9a-f]*$/.test(keytext)))
	{
		alert("请输入16进制数！");
		throw new Error("输入不是16位数!");
	}
	var plain = [];
	for(var i=0; i < 16; i++)
	{
		plain[i] = parseInt(plaintext.slice(i*2,i*2+2),16);
	}
	aesEncrypt(plain, w);
	for (var i in plain) {
		plain[i] = plain[i].toString(16);
		if(plain[i].length == 1)
		{
			plain[i] = '0' + plain[i];
		}
	}
	aesEciphertext.value = plain.join("");
}
/*
 *点击“解密”按钮的事件响应
 */
function clickDecrypt()
{
	var keytext = aesDkeytext.value;
	var key = [];
	for(var i=0; i < 16; i++)
	{
		key[i] = parseInt(keytext.slice(i*2,i*2+2),16);
	}
	var w = keyExpansion(key);
	
	var ciphertext = aesDciphertext.value;
	if(!(/^[0-9a-f]*$/.test(keytext))||!(/^[0-9a-f]*$/.test(ciphertext)))
	{
		alert("请输入16进制数！");
		throw new Error("输入不是16位数!");
	}
	var plain = [];
	for(var i=0; i < 16; i++)
	{
		plain[i] = parseInt(ciphertext.slice(i*2,i*2+2),16);
	}
	aesDecrypt(plain, w);
	for (var i in plain) {
		plain[i] = plain[i].toString(16);
		if(plain[i].length == 1)
		{
			plain[i] = '0' + plain[i];
		}
	}
	aesDplaintext.value = plain.join("");
}

/*
 *根据控件的id获取控件的内容
 */
var $ = function (s) {
    return document.getElementById(s);
}
var file = "";
/*
 *选择本地文件，获取文件的内容
 */
function handleFileSelect(evt) {  
    var files = evt.target.files;  
    var fr = new FileReader();
    fr.addEventListener("load", function(event) {
        var textFile = event.target;
        file = textFile.result;
    });
    fr.readAsText(files[0]);
}  
/*
 *使用des对文件进行加密
 */
function aesFileEncrypt()
{
	var textResult = [];
	var keytext = aesEkeytext.value;
	var key = new Array(16 + 1).join('0').split('');
	for (var i = 0; i < 32; i += 2) 
	{
        key[i/2] = parseInt((keytext.charAt(i) + keytext.charAt(i+1) ), 16);
    }
	var w = keyExpansion(key);
	var bytes = [];
	for (var i in file) {
        var u = file.charCodeAt(i);
        bytes.push(u >>> 8);
        bytes.push(u % 256);
    }
	
	var plain = []
    for (var j = 0; j < bytes.length; j += 16) {
        for (var i = 0; i < 16; i++) {
            plain[i] = bytes[j+i]
        }
        aesEncrypt(plain, w);
        for (var i in plain) {
            var value = plain[i].toString(16);
            if (value.length == 1) {
                value = '0' + value;
            }
			textResult += value;
        }
    }
	var link = $('aesEFileDownload');
	link.href = makeTextFile (textResult);
	link.setAttribute("download", "encrypt.txt");//decrypt.txt是默认加密后文件，可以修改
    link.style.display = 'inline-block';
}
/*
 *使用des对文件进行解密
 */
function aesFileDecrypt()
{
	var textResult = [];
	var keytext = aesDkeytext.value;
	var key = new Array(16 + 1).join('0').split('');
	for (var i = 0; i < 32; i += 2) 
	{
        key[i/2] = parseInt((keytext.charAt(i) + keytext.charAt(i+1) ), 16);
    }
	var w = keyExpansion(key);
	console.log(file);
	var bytes = [];
	for (var i = 0; i < file.length; i += 2) {
        bytes.push(parseInt((file.charAt(i) + file.charAt(i+1)), 16));
    }
	
	var plain = []
    for (var j = 0; j < bytes.length; j += 16) {
        for (var i = 0; i < 16; i++) {
            plain[i] = bytes[j+i]
        }
        aesDecrypt(plain, w);
        for (var i = 0; i < 16; i+=2) {
            textResult += String.fromCharCode((plain[i]*256+plain[i+1]));
        }
    }
	var link = $('aesDFileDownload');
	link.href = makeTextFile (textResult);
	link.setAttribute("download", "decrypt.txt");//decrypt.txt是默认解密后文件，可以修改
    link.style.display = 'inline-block';
}
var textFile = null;
/*
 *将text的内容写入文件中
 */
function makeTextFile (text) {
    var data = new Blob([text], {type: 'text/plain'});

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};