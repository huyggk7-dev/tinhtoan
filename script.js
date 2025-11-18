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
        if (denominator === 0) { return "Lỗi: Chia cho 0" }; 
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
    const bLabel = document.getElementById('b-label');
    const cInput = document.getElementById('c');
    const cLabel = document.getElementById('c-label');
    const dGroup = document.getElementById('d-group');
    const dInput = document.getElementById('d');
    const dLabelEnd = document.getElementById('d-label-eq');

      // Phương trình Bậc 2
    if (subType === "1") {
        aLabel.innerHTML = ' x<sup>2</sup> + '; 
        bLabel.innerHTML = ' x + ';            
        cLabel.innerHTML = ' = 0 ';            
        
        // Hiện các trường Bậc 2
        document.getElementById('a').style.display = 'inline';
        document.getElementById('b').style.display = 'inline';
        cInput.style.display = 'inline';
        
        // Ẩn các trường Bậc 3
        if (dGroup) dGroup.style.display = 'none';
        if (dInput) dInput.style.display = 'none';
        if (dLabelEnd) dLabelEnd.style.display = 'none';
        
    // Phương trình Bậc 3
    } else if (subType === "2") {
        aLabel.innerHTML = ' x<sup>3</sup> + '; 
        bLabel.innerHTML = ' x<sup>2</sup> + '; 
        cLabel.innerHTML = ' x ';             
        
        // Hiện các trường Bậc 3
        if (dGroup) dGroup.style.display = 'inline';
        if (dInput) dInput.style.display = 'inline';
        if (dLabelEnd) dLabelEnd.style.display = 'inline';
        
    // Ẩn tất cả input (dùng cho chế độ Ma trận/Khác)
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
        solveButton.textContent = "Xét số phức ";        
        loadSubOptions(numSelect, [
            { value: "4", text: "Góc Arg" },
            { value: "5", text: "Căn bậc" }
        ]);
        window.updateEquationUI('none'); 
        
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

// Logic Giải Phương Trình Bậc 2 (Giữ nguyên)
document.getElementById('quadraticForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
        const mainType = document.getElementById('typeSelect').value; 
    const subType = document.getElementById('numSelect').value; 
    
    const a = parseFloat(document.getElementById('a').value) || 0;
    const b = parseFloat(document.getElementById('b').value) || 0;
    const c = parseFloat(document.getElementById('c').value) || 0;
    const d = parseFloat(document.getElementById('d').value) || 0; 

    const solutionDisplay = document.getElementById('solution-display');
    const otherDisplay = document.getElementById('other-display');

    if (mainType === "10" && subType === "1") { // Phương trình Bậc 2
        const delta = b*b - 4*a*c;
        const xv = -b/(-2*a)
        const yv = xv*a*a + b*xv + c;

        const x0 = formatResult(-b, 2*a);
        const y0 = formatResult(yv*1, 1);
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
                const x2_ = formatResult((2 * sqrt_dt * Math.cos(cos_term - (2 * PI / 3))) - b, (3 * a)) ;
                const x3_ = formatResult((2 * sqrt_dt * Math.cos(cos_term + (2 * PI / 3))) - b, (3 * a)) ;
                
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
                
                const term1 = Math.pow(term1_pow, 1.0 / 3); 
                const term2 = Math.pow(term2_pow, 1.0 / 3);
                
                let factor = (Math.sqrt(dt) * abs_k) / (3 * a * k);
                xr = factor * (term1 + term2) + x0;

                }
        } else if (dt === 0) { // Nghiệm bội
            const term = Math.pow(Math.abs(Math.pow(b, 3) - 27 * a * a * d), 1.0 / 3);
            xr = (-b - term) / (3 * a);
            xr_ = formatResult((-b - term) , (3 * a));
            
        } else { // dt < 0: 1 nghiệm thực, 2 phức liên hợp
            const sqrt_abs_dt = Math.sqrt(dt_abs);
            
            const term1 = Math.pow(k + Math.sqrt(k * k + 1), 1.0 / 3);
            const term2 = Math.pow(-(k - Math.sqrt(k * k + 1)), 1.0 / 3);
            
            xr = (sqrt_abs_dt / (3 * a)) * (term1 - term2) + x0;
            xr_ = formatResult( (sqrt_abs_dt * (term1 - term2) - b) ,(3 * a));
        }
        
        // --- Xử lí kết quả 1 nghiệm thực, 2 nghiệm phức ---
        if (xr !== null) {
                        
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
                    if ( xr_ ) { solutionDisplay.innerHTML += ` - x = ${xr_}<br>`;} else { solutionDisplay.innerHTML += ` - x = ${formatResult(xr, 1)}<br>`; }
                    solutionDisplay.innerHTML += ` - x = ${real_str} + ${imag_str}i<br> - x = ${real_str} - ${imag_str}i`;

                    } else {
                    solutionDisplay.innerHTML = `Phương trình có 1 nghiệm thực và 2 nghiệm phức liên hợp:<br>`;
                    if ( xr_ ) { solutionDisplay.innerHTML += ` - x = ${xr_}<br>`;} else { solutionDisplay.innerHTML += ` - x = ${formatResult(xr, 1)}<br>`; }
                    solutionDisplay.innerHTML += ` - x = ${imag_str}i<br> - x = ${imag_str}i`;

                    }
                }
            } else {
                 // Trường hợp có lỗi
                 solutionDisplay.innerHTML = `Lỗi tính toán: Không thể tìm nghiệm phức từ nghiệm thực.`;
            }

        } 

        // Phương trình đạo hàm y' = 3ax^2 + 2bx + c = 0
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
            ctriOutput += `- Điểm cực tiểu : x = ${x1_kq}, y = ${formatResult(y1,1)}<br>`;
            ctriOutput += `- Điểm cực đại : x = ${x2_kq}, y = ${formatResult(y2,1)}<br>`; 

            } else if ( y1 > y2 ) {
            ctriOutput += `<br>Có 2 cực trị:<br>`;
            ctriOutput += `- Điểm cực tiểu : x = ${x2_kq}, y = ${formatResult(y2,1)}<br>`;
            ctriOutput += `- Điểm cực đại : x = ${x1_kq}, y = ${formatResult(y1,1)}<br>`; }

        solutionDisplay.innerHTML += ctriOutput;
        solutionDisplay.innerHTML += 'Các số đã được làm tròn.<br>';
        return;}

     } else {
        solutionDisplay.textContent = "Chức năng sắp có, coming soon";
     }
     otherDisplay.textContent = "Các số đã được làm tròn.";

})

document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('typeSelect'); 
    const numSelect = document.getElementById('numSelect'); 

    if (typeSelect) {
        window.updateMainUI(typeSelect.value);
    }
    
    if (typeSelect) {
        typeSelect.addEventListener('change', (event) => {
            clear();
            window.updateMainUI(event.target.value);
        });
    }
    
    if (numSelect) {
         numSelect.addEventListener('change', (event) => {
            clear();
            if (typeSelect.value === "10") {
                window.updateEquationUI(event.target.value);
            }
         });
    }
});