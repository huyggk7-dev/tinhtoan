// Hàm tìm UCLN (Euclid)
function ucln(a, b) { 
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}
const PI = Math.PI; // Thêm Pi

// Hàm xử lý và định dạng kết quả
function formatResult(numerator, denominator) {
    const stp = numerator / denominator;
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
        if (denominator === 0) { return "_Lỗi: Chia cho 0_" }; 
        if (numerator === 0) { return "0";}
        const uc = ucln(numerator, denominator);
        const tu = numerator / uc;
        const mau = denominator / uc;
        if (mau === 1) {
            return tu;
        } else if (mau === -1) { 
             return -tu;
        } else if (mau < 0) { 
             return `${-tu}/${-mau}`;
        } else {
            return `${tu}/${mau}`;
        }
    } else {
        const kq = Math.round(stp * 10000) / 10000;
        return `${kq}`;
    }
}

function isInteger(number, epsilon = 1e-15) {
    return Math.abs(number - Math.round(number)) < epsilon;
}

function toFraction(num, another) {
    let kq = num ;
    for (let i = 1; i < 1000; i++) {
        let tuso = num / (1/i);
        if (isInteger(tuso)) {
            kq = formatResult( Math.round(tuso) , i);
            break;
           } else { kq = formatResult(num , 1) ; }}
    return kq;
}

// Hàm clear
function clear() {
    document.getElementById('solution-display').textContent = '';
    document.getElementById('other-display').textContent = '';
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('c').value = '';
    
    const dInput = document.getElementById('d');
    if (dInput) dInput.value = '';
}

// Hàm Load
function loadSubOptions(selectElement, options) {
    selectElement.innerHTML = ''; 
    options.forEach(option => {
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.textContent = option.text;
        selectElement.appendChild(newOption);
    });
}

// Hàm điều khiển hiển thị input (Bậc 2/Bậc 3)
window.updateEquationUI = function(subType) {
    const aLabel = document.getElementById('a-label');
    const frontLb = document.getElementById('front-a');
    const aInput = document.getElementById('a');

    const bLabel = document.getElementById('b-label');
    const bInput = document.getElementById('b');
    const cInput = document.getElementById('c');
    const cLabel = document.getElementById('c-label');
    const dGroup = document.getElementById('d-group');
    const dInput = document.getElementById('d');
    const dLabelEnd = document.getElementById('d-label-eq');

    const fractionLine = document.getElementById('fraction-line');  
    const mnGroup = document.getElementById('mn-group');
    const mInput = document.getElementById('m');
    const nInput = document.getElementById('n');
    const mLabel = document.getElementById('m-label');
    const nLabel = document.getElementById('n-label');
    const mLabelStart = document.getElementById('m-label-start')

    // Hàm ẩn và hiện
    const setVisibility = (aShow, bShow, cShow, dShow, mnShow) => {
        aInput.style.display = aShow ? 'inline' : 'none';
        bInput.style.display = bShow ? 'inline' : 'none';
        cInput.style.display = cShow ? 'inline' : 'none';
        
        if (dGroup) dGroup.style.display = dShow ? 'inline' : 'none';
        if (dInput) dInput.style.display = dShow ? 'inline' : 'none';
        if (dLabelEnd) dLabelEnd.style.display = dShow ? 'inline' : 'none';

        // Xử lý inputs m, n
        if (fractionLine) fractionLine.style.display = mnShow ? 'block' : 'none';
        if (mnGroup) mnGroup.style.display = mnShow ? 'flex' : 'none'; };

    // Phương trình Bậc 2
    if (subType === "1") {
        setVisibility(true, true, true, false, false);
        aLabel.innerHTML = ' x<sup>2</sup> + '; 
        bLabel.innerHTML = ' x + ';
        frontLb.innerHTML = ''; 
        cLabel.innerHTML = ' = 0 ';            
                
    // Phương trình Bậc 3
    } else if (subType === "2") {
        setVisibility(true, true, true, true, false);
        frontLb.innerHTML = ''; 
        aLabel.innerHTML = ' x<sup>3</sup> + '; 
        bLabel.innerHTML = ' x<sup>2</sup> + '; 
        cLabel.innerHTML = ' x ';   
        if (dLabelEnd) dLabelEnd.innerHTML = ' = 0 ' ;
        
    // Phương trình phân thức bậc 1
    } else if (subType === "4") {
        setVisibility(true, true, false, false, true);
        fractionLine.style.width = '50%';
        frontLb.innerHTML = 'Xét phương trình phân thức trên ℝ:'; 
        aLabel.innerHTML = 'x +'; 
        bLabel.innerHTML = ' ';
        cLabel.innerHTML = ' ';      
      
        if (dLabelEnd) dLabelEnd.innerHTML = ' ' ;
        if (mLabelStart) mLabelStart.innerHTML = ''; 
        if (mLabel) mLabel.innerHTML = 'x +'; 
        if (nLabel) nLabel.innerHTML = '';
        
    // Phương trình phân thức bậc 2
    } else if (subType === "5") {
        setVisibility(true, true, true, false, true);
        fractionLine.style.width = '70%';

        frontLb.innerHTML = 'Xét phương trình phân thức trên ℝ :'; 
        aLabel.innerHTML = ' x<sup>2</sup> + '; 
        bLabel.innerHTML = ' x + ';  
        cLabel.innerHTML = ' ';    
        cInput.style.display = 'inline';

        if (dLabelEnd) dLabelEnd.innerHTML = ' ' ;
        if (mLabelStart) mLabelStart.innerHTML = ''; 
        if (mLabel) mLabel.innerHTML = 'x +'; 
        if (nLabel) nLabel.innerHTML = '';

        
    // Ẩn tất cả input (dùng cho chế độ Khác)
    } else {
        // Tạm ẩn toàn bộ input
        document.getElementById('a').style.display = 'none';
        document.getElementById('b').style.display = 'none';
        cInput.style.display = 'none';
        if (dGroup) dGroup.style.display = 'none';
        if (dInput) dInput.style.display = 'none';
        if (dLabelEnd) dLabelEnd.style.display = 'none';
        aLabel.innerHTML = '';
        bLabel.innerHTML = '';
        cLabel.innerHTML = '';
    }
}

// Hàm điều khiển chính (typeSelect -> numSelect + Button Text)
window.updateMainUI = function(mainType) {
    const numSelect = document.getElementById('numSelect');
    const solveButton = document.getElementById('solveButton');
   
    if (mainType === "10") { // Phương trình
        solveButton.textContent = "Giải Phương Trình";        
        loadSubOptions(numSelect, [
            { value: "1", text: "Bậc 2" },
            { value: "2", text: "Bậc 3" }
        ]);
        window.updateEquationUI(numSelect.value);

    } else if (mainType === "20") { // Số phức
        solveButton.textContent = "Xét phương trình";        
        loadSubOptions(numSelect, [
            { value: "4", text: "Bậc 1" },
            { value: "5", text: "Bậc 2/1" }
        ]);
        window.updateEquationUI(numSelect.value); 
        
    } else { // Khác
        solveButton.textContent = "Tính Toán Khác";
        //solveButton.style.display = 'block'; 
        
        loadSubOptions(numSelect, [
            { value: "3", text: "Số nguyên tố" },
            { value: "9", text: "Tùy chọn khác" }
        ]);
        window.updateEquationUI('none');
    }
}

// Logic các chức năng
document.getElementById('quadraticForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
        const mainType = document.getElementById('typeSelect').value; 
    const subType = document.getElementById('numSelect').value; 
    
    let a = parseFloat(document.getElementById('a').value)  || 0;
    let b = parseFloat(document.getElementById('b').value)  || 0;
    let c = parseFloat(document.getElementById('c').value)  || 0;
    let d = parseFloat(document.getElementById('d').value)  || 0;
    let m = parseFloat(document.getElementById('m').value)  || 0;
    let n = parseFloat(document.getElementById('n').value)  || 0; 

    const solutionDisplay = document.getElementById('solution-display');
    const otherDisplay = document.getElementById('other-display');
    solutionDisplay.textContent = ''; 
    otherDisplay.textContent = '';

    if (mainType === "10" && subType === "1") { // Phương trình Bậc 2
        
        const delta = b*b - 4*a*c;
        const xv = -b/(2*a)
        const yv = xv*xv*a + b*xv + c;

        const x0 = formatResult(-b, 2*a);
        const y0 = toFraction(yv*1, 1);
        if (a === 0) {
            if (b === 0) {
                solutionDisplay.textContent = (c === 0) ? "Phương trình vô số nghiệm" : "Phương trình vô nghiệm";
            } else {
                solutionDisplay.textContent = `Phương trình có 1 nghiệm: x = ${formatResult(-c, b)}`;
            }
            return; 
        }

        if (delta > 0) {
            const x1 = formatResult(-b + Math.sqrt(delta), 2 * a);
            const x2 = formatResult(-b - Math.sqrt(delta), 2 * a);
            solutionDisplay.innerHTML = `Phương trình gồm 2 nghiệm: <br> - x = ${x1} và x = ${x2}`;
        } else if (delta === 0) {
            solutionDisplay.textContent = `Phương trình gồm nghiệm kép: x = ${formatResult(-b, 2 * a)}`;
        } else {
            const thuc = formatResult(-b, 2 * a);
            const ao = formatResult(Math.sqrt(-delta), 2 * a);
            solutionDisplay.innerHTML = `Phương trình gồm 2 nghiệm phức: <br> - x = ${thuc} + ${ao} i <br> - x = ${thuc} - ${ao} i`;
        }
        // GTLN,NN 
        if (a > 0 ) {
            solutionDisplay.innerHTML += `<br><br>Giá trị lớn nhất : ${y0} tại x = ${x0}`;
        } else if (a < 0) {
            solutionDisplay.innerHTML += `<br><br>Giá trị nhỏ nhất : ${y0} tại x = ${x0}`;
        }
    } 
    else if (mainType === "10" && subType === "2") {// Phương trình Bậc 3
        let xr = null ; let xr_ ; 
        if (a === 0) {
            solutionDisplay.textContent = "Vui lòng nhập lại a khác 0.";
            return;}
        const dt = b*b - 3*a*c; // Delta và căn
        const dt_abs = Math.abs(dt)
        
        let k_tu = 9 * a * b * c - 2 * Math.pow(b, 3) - 27 * Math.pow(a, 2) * d;
        let k_mau = 2 * Math.sqrt(Math.pow(dt_abs, 3));
        let k;
        if (k_mau === 0) {
            k = 0; 
        } else {
            k = k_tu / k_mau; }  
        const x0 = -b / (3*a);      
  
        if (dt > 0) {
            if (Math.abs(k) <= 1) { // 3 nghiệm thực phân biệt
                const sqrt_dt = Math.sqrt(dt);
                const cos_term = Math.acos(k) / 3;
                 
                const x1_ = formatResult((2 * sqrt_dt * Math.cos(cos_term) - b), (3 * a)) ;
                const x2_ = toFraction((2 * sqrt_dt * Math.cos(cos_term - (2 * PI / 3))) / (3 * a) + x0 , 1 ) ;
                const x3_ = toFraction((2 * sqrt_dt * Math.cos(cos_term + (2 * PI / 3))) / (3 * a) + x0 , 1 ) ;
                
                const x1 = (2 * sqrt_dt * Math.cos(cos_term)) / (3 * a) + x0;
                const x2 = (2 * sqrt_dt * Math.cos(cos_term - (2 * PI / 3))) / (3 * a) + x0;
                const x3 = (2 * sqrt_dt * Math.cos(cos_term + (2 * PI / 3))) / (3 * a) + x0;

                if (x1 !== x2 && x2 !== x3 ) { 
                solutionDisplay.innerHTML = `Phương trình có các nghiệm thực : <br> - x = ${x1_} <br> - x = ${x2_} <br> - x = ${x3_} `;
                } else if (x1 == x2 ){
                solutionDisplay.innerHTML = `Phương trình có các nghiệm thực : <br> - x = ${x1_} <br> - x = ${x3_}`;
                } else if (x1 == x3 ){
                solutionDisplay.innerHTML = `Phương trình có các nghiệm thực : <br> - x = ${x1_} <br> - x = ${x2_}`;
                } else if (x2 == x3 ){
                solutionDisplay.innerHTML = `Phương trình có các nghiệm thực : <br> - x = ${x1_} <br> - x = ${x2_}`;
                }
            } else { // 1 nghiệm thực và 2 nghiệm phức liên hợp
                const abs_k = Math.abs(k);
                const term1_pow = abs_k + Math.sqrt(Math.pow(k, 2) - 1);
                const term2_pow = abs_k - Math.sqrt(Math.pow(k, 2) - 1);
                
                const term1 = Math.cbrt(term1_pow); 
                const term2 = Math.cbrt(term2_pow);
                
                let factor = (Math.sqrt(dt) * abs_k) / (3 * a * k);
                xr = factor * (term1 + term2) + x0;

                }
        } else if (dt === 0) { // Nghiệm bội
            const term = Math.cbrt(Math.abs(Math.pow(b, 3) - 27 * a * a * d));
            xr = (-b - term) / (3 * a);
            xr_ = formatResult((-b - term) , (3 * a));
            
        } else { // dt < 0: 1 nghiệm thực, 2 phức liên hợp
            const sqrt_abs_dt = Math.sqrt(dt_abs);
            
            const term1 = Math.cbrt(k + Math.sqrt(k * k + 1));
            const term2 = Math.cbrt(-( k - Math.sqrt(k * k + 1) ));
            
            xr = (sqrt_abs_dt / (3 * a)) * (term1 - term2) + x0;
            xr_ = formatResult( (sqrt_abs_dt * (term1 - term2) - b) ,(3 * a));
        }
        
        // --- Xử lí kết quả 1 nghiệm thực, 2 nghiệm phức ---
        if (xr !== null) {
            // TH b và c = 0
            if (b === 0 && c === 0) {
            const val = -d / a;
            xr = Math.cbrt(val);}
                        
            const real = (-b / a - xr) / 2;
            const real_str = formatResult(real * 1, 1);

            const y1 = xr + b / (3 * a); 
            const p = (3 * a * c - b * b) / (3 * a * a); 
            const imag_squared = p + (3/4) * y1 * y1;

                if (imag_squared >= -1e-9) {                
                const imag_float = Math.sqrt(Math.abs(imag_squared)); // abs là Giá trị tuyệt đối
                
                if (imag_float < 1e-9) { // Nếu phần ảo quá nhỏ, coi là 3 nghiệm thực bằng nhau/kép
                     solutionDisplay.innerHTML = `Phương trình có nghiệm bội là x = ${xr_}`;
                } else {
                    const imag_str = formatResult(imag_float * 1, 1);
                    if (real !== 0) {
                    solutionDisplay.innerHTML = `Phương trình có 1 nghiệm thực và 2 nghiệm phức liên hợp:<br>`;
                    if ( xr_ ) { solutionDisplay.innerHTML += ` - x = ${toFraction(xr,1)}<br>`;} else { solutionDisplay.innerHTML += ` - x = ${formatResult(xr, 1)}<br>`; }
                    solutionDisplay.innerHTML += ` - x = ${real_str} + ${imag_str}i<br> - x = ${real_str} - ${imag_str}i`;

                    } else {
                    solutionDisplay.innerHTML = `Phương trình có 1 nghiệm thực và 2 nghiệm phức liên hợp:<br>`;
                    if ( xr_ ) { solutionDisplay.innerHTML += ` - x = ${toFraction(xr,1)}<br>`;} else { solutionDisplay.innerHTML += ` - x = ${toFraction(xr, 1)}<br>`; }
                    solutionDisplay.innerHTML += ` - x = ${imag_str}i<br> - x = ${imag_str}i`;}
                }
            } else {
                 // Trường hợp có lỗi
                 solutionDisplay.innerHTML = `Lỗi tính toán: Không thể tìm nghiệm phức từ nghiệm thực.`;
            }

        } 

        // Tìm cực trị qua y' = 3ax^2 + 2bx + c = 0
        const a_prime = 3 * a;
        const b_prime = 2 * b;
        const c_prime = c;
        const delta_prime = b_prime * b_prime - 4 * a_prime * c_prime;
        
        let ctriOutput = `<br>`;

        if (delta_prime < 0) {
           if ( a > 0 ) { solutionDisplay.innerHTML += `<br>Hàm số không có Cực trị (luôn đồng biến trên R).`;
           } else { solutionDisplay.innerHTML += `<br>Hàm số không có Cực trị (luôn nghịch biến trên R).` }

        } else if (delta_prime === 0) {
            solutionDisplay.innerHTML += `<br>Hàm số không có Cực trị`;
        } else {
            // Có 2 cực trị
            const sqrt_delta_prime = Math.sqrt(delta_prime);

            const x_cd_tu = - b_prime + sqrt_delta_prime;
            const x_cd_mau = 2 * a_prime;
            const x_ct_tu = - b_prime - sqrt_delta_prime;
            const x_ct_mau = 2 * a_prime;
 
            const x_cd = x_cd_tu/x_cd_mau; const x_ct = x_ct_tu/x_ct_mau;
            const x_cd_ps = formatResult(-b_prime + sqrt_delta_prime, 2 * a_prime);
            const x_ct_ps = formatResult(-b_prime - sqrt_delta_prime, 2 * a_prime);
            
            let x1, y1, x2, y2, x1_kq, x2_kq;

            x1_kq = x_cd_ps; const m1 = x_cd_tu; const m2 = x_cd_mau; 
            x1 = x_cd;
            y1 = a*x1*x1*x1 + b*x1*x1 + c*x1 + d;

            x2_kq = x_ct_ps; const n1 = x_ct_tu; const n2 = x_ct_mau; 
            x2 = x_ct;
            y2 = a*x2*x2*x2 + b*x2*x2 + c*x2 + d;

            if ( y2 > y1 ) {          
            ctriOutput += `<br>Có 2 cực trị:<br>`;
            ctriOutput += `- Điểm cực tiểu : x = ${x1_kq}, y = ${toFraction(y1,1)}<br>`;
            ctriOutput += `- Điểm cực đại : x = ${x2_kq}, y = ${toFraction(y2,1)}<br>`; 

            } else if ( y1 > y2 ) {
            ctriOutput += `<br>Có 2 cực trị:<br>`;
            ctriOutput += `- Điểm cực tiểu : x = ${x2_kq}, y = ${toFraction(y2,1)}<br>`;
            ctriOutput += `- Điểm cực đại : x = ${x1_kq}, y = ${toFraction(y1,1)}<br>`; }

        solutionDisplay.innerHTML += ctriOutput;
        solutionDisplay.innerHTML += `Các số đã được làm tròn.<br>`;
        return;}

     } else if (mainType === "20" && subType === "4") { //Phương trình phân thức bậc 1  
     
        if (m === 0) {
            solutionDisplay.textContent = "Vui lòng nhập lại m khác 0 trong mẫu mx + n.";
            return;}
        const D = (a * n) - (b * m);

        if (Math.abs(D) < 1e-9) { // D = 0 (Hằng số)
            solutionDisplay.innerHTML += `Hàm số là hàm hằng trên từng khoảng xác định.<br>`;
        } else {
            if (D > 0) {
                solutionDisplay.innerHTML += `Hàm số luôn Đồng biến trên từng khoảng xác định.<br>`;
            } else { // D < 0
                solutionDisplay.innerHTML += `Hàm số luôn Nghịch biến trên từng khoảng xác định.<br>`;
            }
        }

        if (a === 0 && b === 0) {
            solutionDisplay.innerHTML += `Phương trình hàm số có vô số nghiệm. <br>`;
            otherDisplay.innerHTML = `Điều kiện: x ≠ ${toFraction(-n/m, 1)}.`;
            return;}
        if (a === 0) {
            solutionDisplay.innerHTML += `Phương trình hàm số vô nghiệm (Tử số là hằng số khác 0).<br>`;
            solutionDisplay.innerHTML += `<br>Tiệm cận ngang : y = 0 `;
            solutionDisplay.innerHTML += `<br>Tiệm cận đứng : x = ${toFraction(-n/m, 1)}.`;
            return;}
        
        // Tìm ĐKXĐ và nghiệm 
        const x_num = -b / a;
        const x_num_ = formatResult(-b, a);
        const x_dkxd = -n / m;
        const x_dkxd_ = formatResult(-n, m);

        // 3. Kiểm tra: Nghiệm tử số có trùng ĐKXĐ không?
        if (Math.abs(x_num - x_dkxd) < 1e-9) { 
            solutionDisplay.innerHTML += `Phương trình hàm số vô nghiệm.`;
            otherDisplay.innerHTML = `Nghiệm x = ${x_num_} bị loại do không thỏa mãn ĐKXĐ (x ≠ ${x_dkxd_}).`;
        } else {
            solutionDisplay.innerHTML += `Phương trình có nghiệm duy nhất: x = ${x_num_} <br>`;
            otherDisplay.innerHTML = `Điều kiện xác định: x ≠ ${x_dkxd_}. Nghiệm thỏa mãn ĐKXĐ.`;
            solutionDisplay.innerHTML += `<br>Tiệm cận ngang : y = ${toFraction(a/m, 1)} `;
            solutionDisplay.innerHTML += `<br>Tiệm cận đứng : x = ${toFraction(-n/m, 1)}.`;
        }
        return;

     } else if (mainType === "20" && subType === "5") { //Phương trình phân thức bậc 2
        if (m === 0) {
            solutionDisplay.textContent = "Vui lòng nhập lại số m khác 0 trong mẫu mx + n.";
            return;
        }

        // Tìm ĐKXĐ
        const x_dkxd = -n / m;
        const x_dkxd_ = toFraction(-n/m, 1 );

        // Hàm tính giá trị hàm số y = (Ax² + Bx + C) / (Mx + N)
        function calculateValue(x, a, b, c, m, n) {
            const numerator = a * Math.pow(x, 2) + b * x + c;
            const denominator = m * x + n;
            if (Math.abs(denominator) < 1e-9) return NaN; // Trả về NaN nếu Mẫu bằng 0
            return numerator / denominator;
        }
        // Giải phương trình
        let solutionOutput = ``;
        const delta_num = b * b - 4 * a * c; 

        if (a === 0) { 
            solutionDisplay.innerHTML = `Vui lòng nhập lại số a khác 0 trong tử  ax<sup>2</sup> + bx + c = 0. <br>`  
     
        } else { // Tử số là bậc 2: ax² + bx + c = 0
            if (delta_num < 0) {
                solutionOutput += `Phương trình vô nghiệm (Tử số vô nghiệm).`;
            } else if (delta_num === 0) {
                const x_num = -b / (2 * a);
                if (Math.abs(x_num - x_dkxd) < 1e-9) { 
                    solutionOutput += `Phương trình phân thức vô nghiệm (Nghiệm trùng ĐKXĐ).`;
                } else {
                    solutionOutput += `Phương trình phân thức có nghiệm kép: x = ${toFraction(-b/(2*a), 1 )}`;
                }
            } else {
                const sqrt_delta = Math.sqrt(delta_num);
                const x_num1 = (-b + sqrt_delta) / (2 * a);
                const x_num2 = (-b - sqrt_delta) / (2 * a);
                let valid_roots = [];

                if (Math.abs(x_num1 - x_dkxd) > 1e-9) valid_roots.push(x_num1);
                if (Math.abs(x_num2 - x_dkxd) > 1e-9) valid_roots.push(x_num2);

                if (valid_roots.length === 0) {
                    solutionOutput += `Phương trình vô nghiệm.`;
                } else if (valid_roots.length === 1) {
                    solutionOutput += `Phương trình có nghiệm duy nhất: x = ${toFraction(valid_roots[0], 1)}`;
                } else {
                    solutionOutput += `Phương trình có 2 nghiệm: <br> - x = ${toFraction(valid_roots[0], 1)} <br> - x = ${toFraction(valid_roots[1], 1)}`;
                }
            }
        }
        
        solutionDisplay.innerHTML = solutionOutput;
        otherDisplay.innerHTML += `Điều kiện xác định: x ≠ ${x_dkxd_}.`;
        // Xét cực trị với đạo hàm y' = [ (AM)x² + (2AN)x + (BN-CM) ] / (Mx+N)²
        const a_prime = a * m;
        const b_prime = 2 * a * n;
        const c_prime = b * n - c * m;
        const delta_prime = b_prime * b_prime - 4 * a_prime * c_prime;
        
        let ctriOutput = `<br><br>`;            
        if (delta_prime < 0) {
            ctriOutput += `Đạo hàm y'= 0 vô nghiệm trên ℝ. Hàm số không có cực trị.`;

        } else if (delta_prime === 0) {
            const x_crit = -b_prime / (2 * a_prime);
            if (Math.abs(x_crit - x_dkxd) < 1e-9) {
                ctriOutput += `Điểm làm đạo hàm = 0 trùng ĐKXĐ. Hàm số không có cực trị.<br>`;
            } else {
                ctriOutput += `Đạo hàm phương trình có nghiệm kép. Hàm số không có cực trị (có thể có điểm uốn tại x = ${toFraction(x_crit, 1)}).`;
            }
        } else {
            // Có 1 hoặc 2 cực trị (delta_prime > 0)
            const sqrt_delta_prime = Math.sqrt(delta_prime);
            const x_crit1 = (-b_prime + sqrt_delta_prime) / (2 * a_prime);
            const x_crit2 = (-b_prime - sqrt_delta_prime) / (2 * a_prime);
            
            let valid_crit = [];
            if (Math.abs(x_crit1 - x_dkxd) > 1e-9) valid_crit.push(x_crit1);
            if (Math.abs(x_crit2 - x_dkxd) > 1e-9) valid_crit.push(x_crit2);

            const x_a = Math.min(x_crit1, x_crit2);
            const x_b = Math.max(x_crit1, x_crit2);
            
            let x_max = null, y_max = null;
            let x_min = null, y_min = null;
            let valid_crit_count = 0;

            // Kiểm tra nghiệm x_a và x_b
            if (Math.abs(x_a - x_dkxd) > 1e-9) { 
                valid_crit_count++;
                // Xét dấu: Dấu của a_prime quyết định CĐ hay CT
                if (a_prime > 0) {
                    // x_a là CĐ, x_b là CT
                    x_max = x_a; 
                    y_max = calculateValue(x_a, a, b, c, m, n);
                } else {
                    // x_a là CT, x_b là CĐ
                    x_min = x_a;
                    y_min = calculateValue(x_a, a, b, c, m, n);
                }
            }

            if (Math.abs(x_b - x_dkxd) > 1e-9) { 
                valid_crit_count++;
                if (a_prime > 0) {
                    // x_a là CĐ, x_b là CT
                    x_min = x_b; 
                    y_min = calculateValue(x_b, a, b, c, m, n);
                } else {
                    // x_a là CT, x_b là CĐ
                    x_max = x_b;
                    y_max = calculateValue(x_b, a, b, c, m, n);
                }}

           if (valid_crit_count === 2) {
                ctriOutput += `Hàm số có 2 điểm cực trị:<br>`;
                ctriOutput += `- Điểm cực tiểu : x = ${toFraction(x_min, 1)}, y = ${toFraction(y_min, 1)} <br>`;
                ctriOutput += `- Điểm cực đại : x = ${toFraction(x_max, 1)}, y = ${toFraction(y_max, 1)}`;
            } else if (valid_crit_count === 1) {
                // Chỉ còn 1 cực trị (CĐ hoặc CT)
                ctriOutput += `Hàm số có 1 điểm cực trị (do 1 nghiệm trùng ĐKXĐ):<br>`;
                if (x_max !== null) {
                    ctriOutput += `- Điểm cực đại : x = ${toFraction(x_max, 1)}, y = ${toFraction(y_max, 1)}`;
                } else {
                    ctriOutput += `- Điểm cực tiểu : x = ${toFraction(x_min, 1)}, y = ${toFraction(y_min, 1)}`;
                }
            } else {
                ctriOutput += `Hàm số không có cực trị (cả 2 nghiệm trùng ĐKXĐ).`;
            }
        }

        solutionDisplay.innerHTML += ctriOutput;

        // Tìm tiệm cận        
        const x_dng = -n / m; 
        
        const a_tcx = a / m;
        const b_tcx_tu = b * m - a * n;
        const b_tcx_mau = m * m;
        
        let tcanOutput = `<br><br> Phân tích Tiệm cận:<br>`;
        
        tcanOutput += `- Tiệm cận đứng: x = ${toFraction(x_dng, 1)} <br>`;
        let y_tcx = b_tcx_tu / b_tcx_mau ; let y_tcx_ = `` ; 

        if ( Math.abs(y_tcx) < 1e-9 ) { y_tcx_ = ``; 
        } else if ( y_tcx > 0 ) { y_tcx_ = `+ ${toFraction(y_tcx, 1)}`; 
        } else if ( y_tcx < 0 ) { y_tcx_ = `- ${toFraction( - y_tcx, 1)}`; }
 
        if (a !== 0 && m !== 0) {
            if ( Math.abs(a_tcx - 1) < 1e-9 ) { 
                  tcanOutput += `- Tiệm cận xiên: y = x ${y_tcx_}`; // x = 1
            } else if ( Math.abs(a_tcx + 1) < 1e-9 ) {
                  tcanOutput += `- Tiệm cận xiên: y = - x ${y_tcx_}`; // x = -1
            } else { 
                  tcanOutput += `- Tiệm cận xiên: y = ${toFraction(a_tcx, 1)} x ${y_tcx_}`;}
        } else {
             tcanOutput += `- Tiệm cận ngang: y = 0 `;
        }

        solutionDisplay.innerHTML += tcanOutput;
        return;
     } else {
        solutionDisplay.textContent = "Chức năng sắp có, coming soon";
     }
     otherDisplay.innerHTML += `<br>Thử nhiều chức năng khác nhé !!!`;

})

document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('typeSelect'); 
    const numSelect = document.getElementById('numSelect'); 

    if (typeSelect) {
        window.updateMainUI(typeSelect.value);}
    
    if (typeSelect) {
        typeSelect.addEventListener('change', (event) => {
            clear();
            window.updateMainUI(event.target.value);
        });
    }
    
    if (numSelect) {
         numSelect.addEventListener('change', (event) => {
            clear();
            if (typeSelect.value === "10" || typeSelect.value === "20"  ) {
                window.updateEquationUI(event.target.value);}
         });
    }
});