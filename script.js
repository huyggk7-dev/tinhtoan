// Hàm tìm UCLN (Euclid)
function ucln(a, b) { 
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Hàm xử lý và định dạng kết quả
function formatResult(numerator, denominator) {
    const stp = numerator / denominator;
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
        if (denominator === 0) return "Lỗi: Chia cho 0"; 
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
        const kq = Math.round(stp * 100) / 100;
        return `${kq}`;
    }
}

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

    } else if (mainType === "20") { // Ma trận
        solveButton.textContent = "Tính Ma Trận";        
        loadSubOptions(numSelect, [
            { value: "4", text: "3x3" },
            { value: "5", text: "4x4" }
        ]);
        window.updateEquationUI('none'); 
        
    } else { // Khác
        solveButton.textContent = "Tính Toán Khác";
        solveButton.style.display = 'block'; 
        
        loadSubOptions(numSelect, [
            { value: "3", text: "Số nguyên tố" },
            { value: "99", text: "Tùy chọn khác" }
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
        //const xv = - b/(2a)
        //const yv = xv*a*a + b*xv + c
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
            solutionDisplay.innerHTML = `Phương trình gồm 2 nghiệm: <br>x = ${x1} và x = ${x2}`;
        } else if (delta === 0) {
            solutionDisplay.textContent = `Phương trình gồm 2 nghiệm kép: x = ${formatResult(-b, 2 * a)}`;
        } else {
            const thuc = formatResult(-b, 2 * a);
            const ao = formatResult(Math.sqrt(-delta), 2 * a);
            solutionDisplay.innerHTML = `Phương trình gồm 2 nghiệm phức: <br>x = ${thuc} + ${ao} i <br>x = ${thuc} - ${ao} i`;
        }
        // GTLN,NN 
        //if (a > 0 ){
        //}
    } 
    else {
        solutionDisplay.textContent = `Chức năng chưa được lập trình.`;
        otherDisplay.textContent = `Type: ${mainType}, Sub: ${subType}`;
    }
    
});

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