var DES = {
		IP_Table: [58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7],
		IPR_Table: [40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25],
		PC1_Table: [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
		PC2_Table: [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
		LOOP_Table: [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1],
		Num: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
		E_Table: [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1],
		P_Table: [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25],
		S_Box: [[[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7], [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8], [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0], [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]], [[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10], [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5], [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15], [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]], [[10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8], [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1], [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7], [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]], [[7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15], [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9], [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4], [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]], [[2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9], [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6], [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14], [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]], [[12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11], [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8], [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6], [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]], [[4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1], [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6], [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2], [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]], [[13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7], [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2], [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8], [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]]],
		};

/*
 *解密主函数
 *输入：plainBit64:长度为64的二进制数组，key:长度为16的字符串
 *输出：plain：长度为16的字符串
 */		
function desDecrypt(plainBit64, key)
{
	// String -> char[64]
	var keyBit64 = stringToChar64(key);
	var subKey = GensubKey(keyBit64);
	// IP置换 
	var plainBit64IP = [];
	for(var cnt = 0; cnt < 64; cnt++)
	{
		plainBit64IP[cnt] = plainBit64[DES.IP_Table[cnt]-1];
	}
	var R = [];
	var L = [];
	for(var i = 0; i < 16; i++)
	{
		L[i] = [];
		R[i] = [];
	}
	for(cnt = 0; cnt < 32; cnt++)
	{
		L[0][cnt] = plainBit64IP[cnt];
		R[0][cnt] = plainBit64IP[32 + cnt];
	}
	for(var i = 0; i < 16; i++)
	{
		L[i+1] = R[i];
		var s = f(R[i],subKey[15 - i]);
		R[i+1] = Xor(L[i],s);
	}
	var Out64 = [];
	var out = [];
	Out64 = R[16].concat(L[16]);
	for(var cnt = 0; cnt < 64; cnt++)
		out[cnt] = Out64[DES.IPR_Table[cnt]-1];
	var outString;
	outString = out.join("");
	var outStringL = outString.substr(0,32);
	var outStringR = outString.substr(32,32);
	var plain = parseInt(outStringL,2).toString(16).concat(parseInt(outStringR,2).toString(16));
	return plain;
}
/*
 *加密主函数
 *输入：plainBit64:长度为64的二进制数组，key:长度为16的字符串
 *输出：cipher：长度为16的字符串
 */
function desEncrypt(plainBit64, key)
{
	IP_Input.value = "";
	s32.value = "";
	f32.value = "";
	left32.value = "";
	right32.value = "";
	keys.value = "";		
	
	// String -> char[64]	
	var keyBit64 = stringToChar64(key);
	var subKey = GensubKey(keyBit64);
	var k = [];
	for(var i=0; i<16; i++)
	{
		k[i] = "key" + DES.Num[i] + ": " +subKey[i].join("");
		keys.value += k[i] + "\n";
	}
	// IP置换 
	var plainBit64IP = [];
	for(var cnt = 0; cnt < 64; cnt++)
	{
		plainBit64IP[cnt] = plainBit64[DES.IP_Table[cnt]-1];
	}
	IP_Input.value = plainBit64IP.join("");
	var R = [];
	var L = [];
	for(var i = 0; i < 16; i++)
	{
		L[i] = [];
		R[i] = [];
	}
	for(cnt = 0; cnt < 32; cnt++)
	{
		L[0][cnt] = plainBit64IP[cnt];
		R[0][cnt] = plainBit64IP[32 + cnt];
	}
	var fShow = [];
	for(var i = 0; i < 16; i++)
	{
		L[i+1] = R[i];
		var s = f(R[i],subKey[i],i);
		fShow[i] = "f[" + DES.Num[i] + "]: " +s.join("");
		f32.value += fShow[i] + "\n";
		R[i+1] = Xor(L[i],s);
	}
	var Lshow = [];
	for(var i=0; i<16; i++)
	{
		Lshow[i] = "L[" + DES.Num[i] + "]: " +L[i+1].join("");
		left32.value += Lshow[i] + "\n";
	}
	var Rshow = [];
	for(var i=0; i<16; i++)
	{
		Rshow[i] = "R[" + DES.Num[i] + "]: " + R[i+1].join("");
		right32.value += Rshow[i] + "\n";
	}
	var Out64 = [];
	var out = [];
	Out64 = R[16].concat(L[16]);
	for(var cnt = 0; cnt < 64; cnt++)
		out[cnt] = Out64[DES.IPR_Table[cnt]-1];
	var outString;
	outString = out.join("");
	var outStringL = outString.substr(0,32);
	var outStringR = outString.substr(32,32);
	var cipher = parseInt(outStringL,2).toString(16).concat(parseInt(outStringR,2).toString(16));
	return cipher;
}
/*
 *字符串转换成二进制数组
 *输入：长度为16的字符串
 *输出：长度为64的二进制数组
 */
function stringToChar64(input)
{
	var inputChar8 = input.split("");
	if(inputChar8.length != 16)
	{
		alert("请输入16位数！");
		throw new Error("输入不是16位数!");
	}
	var inputBit64 = [];
	for(var i = 0; i < 16; i++)
	{
		if(isNaN(parseInt(inputChar8[i],16)))
		{	
			alert("请输入正确的十六进制数！");
			throw new Error("输入不是正确的十六进制数!");
		}
		inputBit64.push.apply(inputBit64, pad(parseInt(inputChar8[i],16).toString(2),4).split(""));
	}
	return inputBit64;
}
/*
 *f函数
 *输入：R：32位数组，key：每一轮的密钥，i:加密的轮数
 *输出：32位数组
 */
function f(R,key,i)
{
	var RE = [];
	for(var cnt = 0; cnt < 48; cnt++)
	{
		RE[cnt] = R[DES.E_Table[cnt] - 1];
	}
	var RExorKey = Xor(RE,key);
	var RES = [];
	var RES_Temp = [];
	for(var cnt = 0; cnt < 8; cnt++)
	{		
		RES_Temp = RExorKey.slice(cnt*6,cnt*6+6);
		RES[cnt] = RES_Temp;
	}
	var s = [];
	var str1 = [];
	var str2 = [];
	var s48 = [];
	for(var cnt = 0; cnt < 8; cnt++)
	{
		str1[cnt] = (RES[cnt][0]<<1) + RES[cnt][5];
		str2[cnt] = (RES[cnt][1]<<3) + (RES[cnt][2]<<2) + (RES[cnt][3]<<1) + RES[cnt][4];
		s[cnt] = DES.S_Box[cnt][str1[cnt]][str2[cnt]];
		s48.push.apply(s48,pad(parseInt(s[cnt],10).toString(2),4).split(""))
	}
	s32.value +="S[" + DES.Num[i] + "]: " + s48.join("") + "\n";
	var s32P = [];
	for(var cnt = 0; cnt < 32; cnt++)
	{
		s32P[cnt] = s48[DES.P_Table[cnt]-1];
	}
	return s32P;
}
/*
 *异或操作
 *输入：两个位数相同的数组
 *输出：与输入位数相同的数组
 */
function Xor(A,B)
{
	for (var i = 0,j = B.length,rtn = new Array(j); i < j; i++) 
		rtn[i] = A[i] ^ B[i];
	return rtn
}

/*
 *生成轮密钥
 *输入：长度为64的二进制数组
 *输出：key48:16*48的二维数组
 */
function GensubKey(keyBit64)
{
	// PC1变换
	var keyPC1 = [];
	for(cnt = 0; cnt < 56; cnt++)
	{
		keyPC1[cnt] = keyBit64[DES.PC1_Table[cnt]-1];
	}
		
	var C0 = keyPC1.slice(0, 28);
	var D0 = keyPC1.slice(28, 56);
	var key56 = [];
	
	// 循环左移
	for(var i = 0; i < 16; i++)
	{
		for (var j = 0,k = DES.LOOP_Table[i]; j < k; j++) 
		{
			C0.push(C0.shift());
			D0.push(D0.shift());
		}
		key56.push(C0.concat(D0));
	}
	
	// PC2变换
	var key48 = [];
	for(var i = 0; i < 16; i++)
	key48[i] = [];
	for(var i = 0; i < 16; i++)
		for(var cnt = 0; cnt < 48; cnt++)
			key48[i][cnt] = key56[i][DES.PC2_Table[cnt] - 1];
	return key48;
}
/*
 *高位补0操作
 *输入：num是代操作的数，n是输出的长度
 *输出：高位补0后长度为n的数
 */
function pad(num, n) 
{
	y='00000000'+num;
	return y.substr(y.length-n);
}
/*
 *点击“加密”按钮，执行加密过程
 */
function clickDesEncrypt()
{
	var plain = desEplaintext.value;
	var key = desEkeytext.value;
	var plainBit64 = stringToChar64(plain);
	desEciphertext.value = desEncrypt(plainBit64,key);
}
/*
 *点击“解密”按钮，执行解密过程
 */
function clickDesDecrypt()
{
	var cipher = desDciphertext.value;
	var key = desDkeytext.value;
	var plainBit64 = stringToChar64(cipher);
	desDplaintext.value = desDecrypt(plainBit64,key);
}

/*
 *以下是利用DES算法对文件进行加密解密过程，解密文件后输出的是乱码，故此功能为实现，此部分的内容全被注释掉了
 */

/*
 *根据控件的id获取控件的内容
 */
/*
var $ = function (s) {
    return document.getElementById(s);
}
var file = "";
*/
/*
 *选择本地文件，获取文件的内容
 */
/* 
function handleFileSelect(evt) {  
    var files = evt.target.files; 
    var fr = new FileReader();
    fr.addEventListener("load", function(event) {
        var textFile = event.target;
        file = textFile.result;
    });
    fr.readAsText(files[0]);
} 
*/ 
/*
 *使用des对文件进行加密
 */
/*
function desFileEncrypt()
{
	var textResult = [];
	var key = desEkeytext.value;
	var bytes = [];
	for (var i in file) {
        var u = file.charCodeAt(i);
        bytes.push(u >>> 8);
        bytes.push(u % 256);
    }
	
	var plain = []
    for (var j = 0; j < bytes.length; j += 8) 
	{
		var plain8 = [];
        for (var i = 0; i < 8; i++) {
            plain[i] = bytes[j+i]
			plain8[i] = pad(parseInt(plain[i],10).toString(2),8);
        }
		var plain64 = plain8.join("");
		var result = desEncrypt(plain64,key);
		textResult += result;
	}
	console.log(textResult);
	var link = $('desEFileDownload');
	link.href = makeTextFile (textResult);
	link.setAttribute("download", "desEncrypt.txt");
    link.style.display = 'inline-block';
}
*/
/*
 *使用des对文件进行解密
 */
 /*
function desFileDecrypt()
{
	var textResult = [];
	var key = desDkeytext.value;
	var bytes = [];
	for (var i = 0; i < file.length; i += 2) {
        bytes.push(parseInt((file.charAt(i) + file.charAt(i+1)), 16));
    }
	
	var plain = []
	var plain8 = [];
    for (var j = 0; j < bytes.length; j += 16) {
        for (var i = 0; i < 16; i++) {
            plain[i] = bytes[j+i]
			plain8[i] = pad(parseInt(plain[i],10).toString(2),8);
        }
		var plain64 = plain8.join("");
        var result = desDecrypt(plain64, key);
        textResult += String.fromCharCode(result);
    }
	console.log(textResult);
	var link = $('desDFileDownload');
	link.href = makeTextFile (textResult);
	link.setAttribute("download", "desDecrypt.txt");
    link.style.display = 'inline-block';
}

var textFile = null;
*/
/*
 *将text的内容写入文件
 */
/*
function makeTextFile (text) {
    var data = new Blob([text], {type: 'text/plain'});

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};
*/