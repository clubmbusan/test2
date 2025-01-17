document.addEventListener('DOMContentLoaded', () => {
    // ✅ DOM 요소 참조 (원래 개수 12개 유지)
    const inheritanceType = document.getElementById('inheritanceType');
    const personalSection = document.getElementById('personalSection');
    const groupSection = document.getElementById('groupSection');
    const businessPersonalSection = document.getElementById('businessPersonalSection');
    const businessGroupSection = document.getElementById('businessGroupSection');
    const addAssetButton = document.getElementById('addAssetButton');
    const assetContainer = document.getElementById('assetContainer');
    const addHeirButton = document.getElementById('addHeirButton');
    const businessGroupHeirContainer = document.getElementById('businessGroupHeirContainer');
    const addBusinessGroupHeirButton = document.getElementById('addBusinessGroupHeirButton');
    const calculateButton = document.getElementById('calculateButton');
    const result = document.getElementById('result');

    // ✅ 섹션 초기화 함수
    function resetSections() {
        personalSection.style.display = 'none';
        groupSection.style.display = 'none';
        businessPersonalSection.style.display = 'none';
        businessGroupSection.style.display = 'none';
    }

    // ✅ 초기 로딩 시 개인 상속을 기본값으로 설정
    function initializeDefaultView() {
        resetSections();
        personalSection.style.display = 'block';
    }

    // ✅ 상속 유형 변경 이벤트 리스너
    inheritanceType.addEventListener('change', () => {
        resetSections();
        switch (inheritanceType.value) {
            case 'personal': personalSection.style.display = 'block'; break;
            case 'group': groupSection.style.display = 'block'; break;
            case 'businessPersonal': businessPersonalSection.style.display = 'block'; break;
            case 'businessGroup': businessGroupSection.style.display = 'block'; break;
            default: console.error('잘못된 상속 유형 선택'); break;
        }
    });

    // ✅ 개인 상속의 부모 연령 선택 필드 (수정된 코드)
const relationshipSelect = document.getElementById("relationshipPersonal");
const parentAgeContainer = document.getElementById("parentAgeContainer");

if (relationshipSelect && parentAgeContainer) {
    relationshipSelect.addEventListener("change", function () {
        if (this.value === "parent") {
            parentAgeContainer.style.display = "block"; // ✅ inline-block → block 변경
        } else {
            parentAgeContainer.style.display = "none";
        }
    });
}

// ✅ 개인 상속: 미성년 자녀 나이 입력 필드 추가 (수정된 코드)
const minorChildAgeContainer = document.getElementById('minorChildAgeContainer');

if (relationshipSelect && minorChildAgeContainer) {
    relationshipSelect.addEventListener('change', function () {
        minorChildAgeContainer.style.display = this.value === 'minorChild' ? 'block' : 'none';
    });
}


    // ✅ 전체 상속의 부모 연령 선택 필드 (기존 코드 유지)
document.getElementById("heirContainer").addEventListener("change", function (event) {
    if (event.target.classList.contains("relationship")) {
        const heirEntry = event.target.closest('.heir-entry');
        const parentAgeField = heirEntry?.querySelector(".parentAgeField");

        if (parentAgeField) {
            parentAgeField.style.display = event.target.value === "parent" ? "inline-block" : "none";
        }
    }
});

// ✅ 전체 상속: 미성년 자녀 나이 입력 필드 추가 (수정된 코드)
document.getElementById("heirContainer").addEventListener("change", function (event) {
    if (event.target.classList.contains("relationship")) {
        const heirEntry = event.target.closest(".heir-entry");
        const minorChildAgeField = heirEntry?.querySelector(".minorChildAgeField");

        if (minorChildAgeField) {
            minorChildAgeField.style.display = event.target.value === "minorChild" ? "block" : "none";
        }
    }
});
    
    // 자산 유형 변경 처리
    function handleAssetTypeChange(assetTypeSelect) {
    const assetEntry = assetTypeSelect.closest('.asset-entry');
    if (!assetEntry) {
        console.error('assetTypeSelect의 상위 .asset-entry 요소를 찾을 수 없습니다.');
        return; // 더 이상 진행하지 않음
    }

    const assetFields = assetEntry.querySelector('.assetFields');
    const fields = {
        cashField: assetFields.querySelector('.cashField'),
        realEstateField: assetFields.querySelector('.realEstateField'),
        stockQuantityField: assetFields.querySelector('.stockQuantityField'),
        stockPriceField: assetFields.querySelector('.stockPriceField'),
        stockTotalField: assetFields.querySelector('.stockTotalField'),
        othersField: assetFields.querySelector('.othersField'),
    };

    // 모든 필드 숨기기 (기존 코드는 삭제됨)
    Object.values(fields).forEach(field => {
        if (field) field.style.display = 'none';
    });

    // 선택된 유형에 따라 표시
    switch (assetTypeSelect.value) {
        case 'cash':
            fields.cashField.style.display = 'block';
            break;
        case 'realEstate':
            fields.realEstateField.style.display = 'block';
            break;
        case 'stock':
            fields.stockQuantityField.style.display = 'block';
            fields.stockPriceField.style.display = 'block';
            fields.stockTotalField.style.display = 'block';
            break;
        case 'others':
            fields.othersField.style.display = 'block';
            break;
        default:
            console.error('알 수 없는 자산 유형입니다:', assetTypeSelect.value);
            break;
    }
}

    // 모든 assetType에 이벤트 리스너 추가
document.querySelectorAll('.assetType').forEach(select => {
    select.addEventListener('change', () => handleAssetTypeChange(select));
});

    // 초기화 호출
initializeDefaultView();
    
 // "다시 하기" 버튼 이벤트 리스너
document.querySelectorAll('.removeAssetButton').forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        // 해당 자산 항목을 초기화
        const assetEntry = button.closest('.asset-entry');
        if (assetEntry) {
            // 현재 자산 유형 유지
            const assetTypeSelect = assetEntry.querySelector('.assetType');
            const currentAssetType = assetTypeSelect.value;

            // 모든 입력 필드 초기화
            assetEntry.querySelectorAll('input').forEach((input) => {
                input.value = ''; // 입력 필드 초기화
            });

            // 필드 표시 상태를 초기화하면서 기존 자산 유형 유지
            assetTypeSelect.value = currentAssetType; // 자산 유형 복원
            handleAssetTypeChange(assetTypeSelect); // 필드 표시 상태 업데이트
        }

        // 전체 계산 필드 초기화
        document.querySelectorAll('.assetValue').forEach((input) => {
            input.value = ''; // 계산 필드 초기화
        });

        // 결과 영역 초기화
        const resultArea = document.getElementById('result');
        if (resultArea) {
            resultArea.innerHTML = ''; // 결과를 초기화
        }
    });
}); 

      // 초기화: 모든 .assetValue 필드에 콤마 이벤트 등록
document.querySelectorAll('.assetValue').forEach(addCommaFormatting);

// 초기 주식 입력 필드에 콤마 이벤트 등록 (초기 필드)
const initialStockPriceField = document.querySelector('.stockPriceField');
if (initialStockPriceField) {
    addCommaFormatting(initialStockPriceField); // 초기 필드 이벤트 등록
}

    // 재산 추가 버튼 클릭 이벤트
document.getElementById('addAssetButton').addEventListener('click', () => {
    createAssetEntry();

    // 새롭게 추가된 .assetValue 필드에 콤마 이벤트 등록
    const newAssetValues = document.querySelectorAll('.asset-entry:last-child .assetValue');
    newAssetValues.forEach(addCommaFormatting);

    // 새롭게 추가된 .assetType 필드에 이벤트 등록
    const newAssetTypeSelect = document.querySelector('.asset-entry:last-child .assetType');
    if (newAssetTypeSelect) {
        newAssetTypeSelect.addEventListener('change', () => handleAssetTypeChange(newAssetTypeSelect));
    }
});

    // 재산 항목 생성
function createAssetEntry() {
    const newAsset = document.createElement('div');
    newAsset.className = 'asset-entry';
    newAsset.innerHTML = `
        <label>재산 유형:</label>
        <select class="assetType">
            <option value="cash">현금</option>
            <option value="realEstate">부동산</option>
            <option value="stock">주식</option>
            <option value="others">기타</option>
        </select>
        <div class="assetFields">
            <input type="text" class="cashField assetValue" placeholder="금액 (원)" style="display: block;">
            <input type="text" class="realEstateField assetValue" placeholder="평가액 (원)" style="display: none;">
            <input type="number" class="stockQuantityField" placeholder="주식 수량" style="display: none;">
            <input type="text" class="stockPriceField" placeholder="주당 가격 (원)" style="display: none;">
            <input type="text" class="stockTotalField assetValue" placeholder="금액 (원)" style="display: none;" readonly>
            <input type="text" class="othersField assetValue" placeholder="금액 (원)" style="display: none;">
        </div>
    `;

    // 새롭게 생성된 항목을 DOM에 추가
    assetContainer.appendChild(newAsset);

     // 자산 유형 변경 이벤트 리스너 등록
    const assetTypeSelect = newAsset.querySelector('.assetType');
    assetTypeSelect.addEventListener('change', () => handleAssetTypeChange(assetTypeSelect));
}
    
 // 숫자에 콤마를 추가하는 함수
function formatNumberWithCommas(value) {
    return parseInt(value.replace(/[^0-9]/g, '') || '0', 10).toLocaleString();
}

// 입력 필드에 콤마 추가 이벤트 등록
function addCommaFormatting(inputField) {
    inputField.addEventListener('input', () => {
        const numericValue = inputField.value.replace(/,/g, ''); // 콤마 제거
        if (!isNaN(numericValue)) {
            inputField.value = formatNumberWithCommas(numericValue); // 콤마 추가
        }
    });
} 

// 주식 총 금액 계산
document.addEventListener('input', () => {
    const stockQuantity = document.getElementById('stockQuantity');
    const stockPrice = document.getElementById('stockPrice');
    const stockTotal = document.getElementById('stockTotal');

    if (stockQuantity && stockPrice && stockTotal) {
        const quantity = parseInt(stockQuantity.value.replace(/[^0-9]/g, '') || '0', 10);
        const price = parseInt(stockPrice.value.replace(/[^0-9]/g, '') || '0', 10);
        stockTotal.value = (quantity * price).toLocaleString(); // 총 금액 계산 및 콤마 추가
    }

    const mixedStockQuantity = document.getElementById('mixedStockQuantity');
    const mixedStockPrice = document.getElementById('mixedStockPrice');
    const mixedTotalAmount = document.getElementById('mixedTotalAmount');

    if (mixedStockQuantity && mixedStockPrice && mixedTotalAmount) {
        const quantity = parseInt(mixedStockQuantity.value.replace(/[^0-9]/g, '') || '0', 10);
        const price = parseInt(mixedStockPrice.value.replace(/[^0-9]/g, '') || '0', 10);
        const total = quantity * price;
        const cash = parseInt(document.getElementById('mixedCashAmount').value.replace(/[^0-9]/g, '') || '0', 10);
        const realEstate = parseInt(document.getElementById('mixedRealEstateValue').value.replace(/[^0-9]/g, '') || '0', 10);

        mixedTotalAmount.value = (total + cash + realEstate).toLocaleString(); // 총 금액 계산 및 콤마 추가
    }
});
    
    // 계산 시 숫자만 추출
function getNumericValue(field) {
    return parseFloat(field.value.replace(/[^0-9]/g, '')) || 0; // 숫자로 변환 (기본값 0)
}
    
// 상속 비율 입력값 검증 함수
    function validateSharePercentage() {
        const percentageFields = Array.from(document.querySelectorAll('.sharePercentageField'));
        const totalPercentage = percentageFields.reduce((sum, field) => {
            const value = parseFloat(field.value) || 0;
            return sum + value;
        }, 0);

        if (totalPercentage > 100) {
            alert("상속 비율의 합이 100%를 초과할 수 없습니다.");
            return false;
        }

        return true;
    }

      // 상속인 추가 버튼 이벤트
addHeirButton.addEventListener('click', () => {
    const newHeirEntry = document.createElement('div');
    newHeirEntry.className = 'heir-entry';
    newHeirEntry.innerHTML = `
        <input type="text" placeholder="이름">
        <select class="relationship">
            <option value="spouse">배우자</option>
            <option value="adultChild">자녀(성년)</option>
            <option value="minorChild">자녀(미성년)</option>
            <option value="parent">부모</option>
            <option value="sibling">형제자매</option>
            <option value="other">기타</option>
        </select>
        <select class="parentAgeField" style="display: none;">
            <option value="59">60세 미만</option>
            <option value="60">60세 이상</option>
        </select>
        <input type="number" class="minorChildAgeField" style="display: none;" min="0" max="18" placeholder="나이 입력">
        <input type="number" class="sharePercentageField" placeholder="상속 비율 (%)">
    `;

    // 새로 추가된 상속인 입력 필드에 이벤트 등록
    const relationshipSelect = newHeirEntry.querySelector('.relationship');
    relationshipSelect.addEventListener("change", function () {
        const parentAgeField = newHeirEntry.querySelector(".parentAgeField");
        const minorChildAgeField = newHeirEntry.querySelector(".minorChildAgeField");

        // 부모 선택 시 연령 필드 표시
        parentAgeField.style.display = this.value === "parent" ? "inline-block" : "none";

        // 미성년 자녀 선택 시 나이 입력 필드 표시
        minorChildAgeField.style.display = this.value === "minorChild" ? "block" : "none";
    });

    // 새로 추가된 상속 비율 필드 이벤트 등록
    const sharePercentageField = newHeirEntry.querySelector('.sharePercentageField');
    sharePercentageField.addEventListener('input', () => {
        const value = parseFloat(sharePercentageField.value) || 0;

        // 비율 검증: 범위 제한 (0~100)
        if (value < 0 || value > 100) {
            alert('상속 비율은 0%에서 100% 사이여야 합니다.');
            sharePercentageField.value = ''; // 잘못된 입력 초기화
            return;
        }

        // 전체 합 검증
        if (!validateSharePercentage()) {
            sharePercentageField.value = ''; // 잘못된 입력 초기화
        }
    });

    heirContainer.appendChild(newHeirEntry);
});

// 기존 상속 비율 필드 이벤트 등록 (최초 로딩 시 적용)
document.querySelectorAll('.sharePercentageField').forEach((field) => {
    field.addEventListener('input', () => {
        const value = parseFloat(field.value) || 0;

        // 비율 검증: 범위 제한 (0~100)
        if (value < 0 || value > 100) {
            alert('상속 비율은 0%에서 100% 사이여야 합니다.');
            field.value = ''; // 잘못된 입력 초기화
            return;
        }

        // 전체 합 검증
        if (!validateSharePercentage()) {
            field.value = ''; // 잘못된 입력 초기화
        }
    });
});

// 가업 단체 상속: 상속인 추가 버튼 이벤트
addBusinessGroupHeirButton.addEventListener('click', () => {
    // 새 상속인 입력 필드 생성
    const newHeirEntry = document.createElement('div');
    newHeirEntry.className = 'heir-entry-group';
    newHeirEntry.innerHTML = `
        <!-- 후계자 유형 -->
        <select class="heirType">
            <option value="" disabled selected>후계자 유형</option>
            <option value="adultChild">성년 자녀</option>
            <option value="minorChild">미성년 자녀</option>
            <option value="other">기타</option>
        </select>

        <!-- 이름 -->
        <input type="text" placeholder="이름" class="heirName">

        <!-- 관계 -->
        <select class="relationship">
            <option value="" disabled selected>관계 선택</option>
            <option value="spouse">배우자</option>
            <option value="adultChild">성년 자녀</option>
            <option value="minorChild">미성년 자녀</option>
            <option value="parent">부모</option>
            <option value="sibling">형제자매</option>
            <option value="other">기타</option>
        </select>

        <!-- 상속 비율 -->
        <input type="number" class="sharePercentageField" placeholder="상속 비율 (%)">
    `;

    // 가업 단체 상속 섹션에 필드 추가
    const businessGroupSection = document.getElementById('businessGroupSection');
    const addButton = document.getElementById('addBusinessGroupHeirButton');

    if (businessGroupSection && addButton) {
        // 버튼 위에 새 상속인 필드를 삽입
        businessGroupSection.insertBefore(newHeirEntry, addButton);
    } else {
        console.error('businessGroupSection 또는 addBusinessGroupHeirButton을 찾을 수 없습니다.');
    }
});
    
// 재산 유형에 따라 필드를 동적으로 표시
function handleAssetTypeChange(assetTypeSelect) {
    const assetFields = assetTypeSelect.closest('.asset-entry').querySelector('.assetFields');
    const cashField = assetFields.querySelector('.cashField');
    const realEstateField = assetFields.querySelector('.realEstateField');
    const stockQuantityField = assetFields.querySelector('.stockQuantityField');
    const stockPriceField = assetFields.querySelector('.stockPriceField');
    const stockTotalField = assetFields.querySelector('.stockTotalField');
    const othersField = assetFields.querySelector('.othersField');

    // 모든 필드 숨기기
    cashField.style.display = 'none';
    realEstateField.style.display = 'none';
    stockQuantityField.style.display = 'none';
    stockPriceField.style.display = 'none';
    stockTotalField.style.display = 'none';
    othersField.style.display = 'none';

    // 선택된 유형에 따라 표시
    switch (assetTypeSelect.value) {
        case 'cash':
            cashField.style.display = 'block';
            break;
        case 'realEstate':
            realEstateField.style.display = 'block';
            break;
        case 'stock':
            stockQuantityField.style.display = 'block';
            stockPriceField.style.display = 'block';
            stockTotalField.style.display = 'block';
            break;
        case 'others':
            othersField.style.display = 'block';
            break;
    }
}

// 재산 추가 버튼 이벤트
addAssetButton.addEventListener('click', createAssetEntry);    

// ✅ 개인 관계 공제 계산 로직 (배우자 추가 공제 포함)
function calculateExemptions(totalInheritance, relationship, spouseShare = 0, parentAge = 0, minorChildAge = 0) {
    const basicExemption = 200000000; // 기초 공제 (2억 원)
    let relationshipExemption = 0;
    let spouseExtraExemption = 0; // 배우자 추가 공제

    switch (relationship) {
        case 'spouse': 
            relationshipExemption = 500000000; // 배우자 기본 공제 (5억 원)
            
            // ✅ 배우자가 실제 상속받은 금액을 기준으로 추가 공제 (최대 30억)
            if (spouseShare > 500000000) {
                spouseExtraExemption = Math.min(spouseShare - 500000000, 3000000000);
            }

            break;

        case 'adultChild': 
            relationshipExemption = 50000000; // 성년 자녀 공제 (5천만 원)
            break;

        case 'minorChild': 
            const yearsUntilAdult = Math.max(19 - minorChildAge, 0);
            relationshipExemption = 10000000 + (yearsUntilAdult * 10000000); // 연 1천만 원 추가 공제
            break;

        case 'parent': 
            relationshipExemption = parentAge >= 60 ? 100000000 : 50000000;
            break;

        case 'sibling':
        case 'other':
            relationshipExemption = 10000000; // 기타 상속인 공제 (천만 원)
            break;

        default:
            console.error('잘못된 관계 선택:', relationship);
            return { basicExemption, relationshipExemption: 0, totalExemption: 0 };
    }

    // ✅ 최종 공제 계산 (배우자 추가 공제 포함)
    let totalExemption = basicExemption + relationshipExemption + spouseExtraExemption;

    // ✅ 배우자가 아닌 경우 최종 공제 최소 5억 보장
    if (relationship !== 'spouse' && totalExemption < 500000000) {
        totalExemption = 500000000;
    }

    return { 
        basicExemption, 
        relationshipExemption, 
        spouseExtraExemption, // 배우자 추가 공제 값 반환
        totalExemption 
    };
}

// 과세표준 계산 함수
function calculateTaxableAmount(totalInheritance, exemptions) {
    return Math.max(totalInheritance - exemptions.totalExemption, 0); // 음수일 경우 0 처리
}

/**
 * 누진세율 계산 함수
 * @param {number} taxableAmount - 과세 금액
 * @returns {number} 상속세 금액
 */
function calculateTax(taxableAmount) {
    const taxBrackets = [
        { limit: 100000000, rate: 0.1 },   // 1억 이하: 10%
        { limit: 500000000, rate: 0.2 },   // 1억 초과 ~ 5억: 20%
        { limit: 1000000000, rate: 0.3 },  // 5억 초과 ~ 10억: 30%
        { limit: 3000000000, rate: 0.4 },  // 10억 초과 ~ 30억: 40%
        { limit: Infinity, rate: 0.5 },    // 30억 초과: 50%
    ];

    let tax = 0;
    let previousLimit = 0;

    for (const bracket of taxBrackets) {
        if (taxableAmount > bracket.limit) {
            tax += (bracket.limit - previousLimit) * bracket.rate;
            previousLimit = bracket.limit;
        } else {
            tax += (taxableAmount - previousLimit) * bracket.rate;
            break;
        }
    }

    return Math.max(tax, 0); // 음수 방지
}

// 주식 총액을 assetValue에 포함
document.addEventListener('input', () => {
    const stockQuantity = document.getElementById('stockQuantity');
    const stockPrice = document.getElementById('stockPrice');
    const stockTotal = document.getElementById('stockTotal');

    if (stockQuantity && stockPrice && stockTotal) {
        const quantity = parseInt(stockQuantity.value.replace(/[^0-9]/g, '') || '0', 10);
        const price = parseInt(stockPrice.value.replace(/[^0-9]/g, '') || '0', 10);
        stockTotal.value = (quantity * price).toLocaleString(); // 총 금액 계산
        stockTotal.classList.add('assetValue'); // assetValue 클래스를 추가하여 총액 계산에 포함
    }
});    

  /**
 * 개인 상속 계산 함수
 * @param {number} totalAssetValue - 총 상속 재산 금액
 */
function calculatePersonalMode(totalAssetValue) {
    const relationship = document.getElementById('relationshipPersonal')?.value || 'other';

    // ✅ 부모 연령 가져오기
    let parentAge = 0;
    let parentAgeSelect = document.getElementById('parentAge');
    if (relationship === 'parent' && parentAgeSelect) {
        parentAge = parseInt(parentAgeSelect.value) || 0;
    }

    // ✅ 미성년 자녀 나이 가져오기
    let minorChildAge = 0;
    let minorChildAgeInput = document.getElementById('minorChildAge');
    if (relationship === 'minorChild' && minorChildAgeInput) {
        minorChildAge = parseInt(minorChildAgeInput.value) || 0;
    }

    // ✅ 공제 계산 (기초 공제 + 관계 공제)
    let { basicExemption, relationshipExemption } = calculateExemptions(
        totalAssetValue, relationship, totalAssetValue, parentAge, minorChildAge
    );

    // ✅ 최종 공제 계산
    let totalExemption = basicExemption + relationshipExemption;
    let spouseAdditionalExemption = 0;

    if (relationship === 'spouse') {
        // 🔹 배우자 추가 공제 (기초 2억 + 관계 5억 초과분 최대 23억)
        spouseAdditionalExemption = Math.min(totalAssetValue - 700000000, 2300000000);
        if (spouseAdditionalExemption > 0) {
            totalExemption += spouseAdditionalExemption;
        }
    }

    // ✅ 배우자가 아닐 경우, 최종 공제액이 5억 미만이면 5억 보장 (일괄 공제)
    if (relationship !== 'spouse' && totalExemption < 500000000) {
        totalExemption = 500000000;
    }

    // ✅ 과세 금액 계산
    const taxableAmount = Math.max(totalAssetValue - totalExemption, 0);

    // ✅ 상속세 계산
    const tax = calculateTax(taxableAmount);

    // 🔍 디버깅용 콘솔 로그
    console.log("🔍 Debug Info:");
    console.log("총 재산 금액:", totalAssetValue);
    console.log("부모 연령:", parentAge);
    console.log("미성년 자녀 나이:", minorChildAge);
    console.log("기초 공제:", basicExemption);
    console.log("관계 공제:", relationshipExemption);
    console.log("배우자 추가 공제:", spouseAdditionalExemption);
    console.log("최종 공제 금액:", totalExemption);
    console.log("과세 금액:", taxableAmount);
    console.log("상속세:", tax);

    // ✅ 결과 출력
    document.getElementById('result').innerHTML = `
        <h3>계산 결과 (개인 상속)</h3>
        <p>총 재산 금액: ${totalAssetValue.toLocaleString()} 원</p>
        <p><strong>공제 내역:</strong></p>
        <ul>
            <li>기초 공제: ${basicExemption.toLocaleString()} 원</li> 
            <li>관계 공제: ${relationshipExemption.toLocaleString()} 원 (${relationship})</li>
            ${relationship === 'spouse' ? `<li>배우자 추가 공제: ${spouseAdditionalExemption.toLocaleString()} 원</li>` : ''}
        </ul>
        <p><strong>최종 공제 금액:</strong> ${totalExemption.toLocaleString()} 원</p>
        <p>과세 금액: ${taxableAmount.toLocaleString()} 원</p>
        <p>상속세: ${tax.toLocaleString()} 원</p>
    `;
}

  // ✅ 관계 공제 계산 함수
function calculateRelationshipExemption(relationship, age = 0) {
    switch (relationship) {
        case 'spouse': return 500000000; // 배우자: 5억 원
        case 'adultChild': return 50000000; // 성년 자녀: 5천만 원
        case 'minorChild': return 10000000 * (20 - age); // 미성년 자녀: 1천만 원 × (20 - 나이)
        case 'parent': return (age >= 60) ? 100000000 : 50000000; // 부모: 60세 이상 1억 원, 미만 5천만 원
        case 'other': return 10000000; // 기타 상속인: 1천만 원
        default: return 0;
    }
}

// ✅ 배우자 추가 공제 계산 함수
function calculateSpouseAdditionalExemption(spouseShare, totalAssetValue) {
    let maxExemption = totalAssetValue - 500000000 - spouseShare;
    return Math.min(spouseShare, maxExemption, 3000000000);
}

// ✅ 전체 상속 계산 함수
function calculateGroupMode(totalAssetValue) {
    const heirContainer = document.querySelector('#groupSection #heirContainer');

    let totalBasicExemption = 200000000; // 기초 공제 2억
    let totalRelationshipExemption = 0;

    // ✅ 상속인 정보 저장
    let heirs = Array.from(heirContainer.querySelectorAll('.heir-entry')).map((heir) => {
        const name = heir.querySelector('.heirName')?.value.trim() || '이름 없음';
        const relationship = heir.querySelector('.relationship')?.value || 'other';
        const age = parseInt(heir.querySelector('.ageField')?.value || '0');
        const sharePercentage = parseFloat(heir.querySelector('.sharePercentageField')?.value || '0');

        totalRelationshipExemption += calculateRelationshipExemption(relationship, age);

        return { name, relationship, age, sharePercentage };
    });

    // ✅ 관계 공제 총합이 5억 미만이면 보정
    if (totalRelationshipExemption < 500000000) {
        totalRelationshipExemption = 500000000;
    }

    // ✅ 과세 대상 금액 계산
    let taxableAmount = totalAssetValue - totalBasicExemption - totalRelationshipExemption;

    // ✅ 개별 상속 계산
    heirs = heirs.map((heir) => {
        const shareAmount = (totalAssetValue * heir.sharePercentage) / 100;

        // ✅ 배우자의 관계 공제 = 5억 원 (배우자에게만 적용)
        let relationshipExemption = 0;
        if (heir.relationship === 'spouse') {
            relationshipExemption = 500000000;
        } else if (heir.relationship === 'adultChild') {
            // ✅ 성년 자녀는 자기 공제 5천만 원 적용
            relationshipExemption = 50000000;
        }

        // ✅ 기초 공제 = 2억 원을 지분 비율대로 적용
        const basicExemption = (totalBasicExemption * heir.sharePercentage) / 100;

        // ✅ 배우자 추가 공제 계산 (최대 30억 원 공제 가능)
        let spouseAdditionalExemption = 0;
        if (heir.relationship === 'spouse') {
            spouseAdditionalExemption = Math.min(3000000000 - (relationshipExemption + basicExemption), shareAmount);
        }

        const finalTaxableAmount = Math.max(shareAmount - relationshipExemption - basicExemption - spouseAdditionalExemption, 0);
        const tax = calculateTax(finalTaxableAmount);

        return {
            ...heir,
            name: heir.name,  // ✅ 이름이 제대로 표시되도록 수정
            shareAmount,
            relationshipExemption,
            basicExemption,
            spouseAdditionalExemption,
            finalTaxableAmount,
            tax
        };
    });
    
    // ✅ 결과 출력 (기초 공제 부분 수정)
    document.getElementById('result').innerHTML = `
         <h3>총 상속 금액: ${totalAssetValue.toLocaleString()} 원</h3>
         <h3>기초 공제: ${totalBasicExemption.toLocaleString()} 원</h3>
         <h3>관계 공제 합계: ${totalRelationshipExemption.toLocaleString()} 원</h3>
         <h3>과세 금액: ${taxableAmount.toLocaleString()} 원</h3>
         ${heirs.map((heir) => `
             <p>
                 <strong>${heir.name}</strong> (${heir.sharePercentage}% 지분): ${heir.shareAmount.toLocaleString()} 원<br>
                 기초 공제: ${heir.basicExemption.toLocaleString()} 원<br>
                 관계 공제: ${heir.relationshipExemption.toLocaleString()} 원 (${heir.relationship})<br>
                 ${heir.relationship === 'spouse' ? `<strong>추가 공제:</strong> ${heir.spouseAdditionalExemption.toLocaleString()} 원 (배우자 추가 공제)<br>` : ''}
                 <strong>과세 금액:</strong> ${heir.finalTaxableAmount.toLocaleString()} 원<br>
                 <strong>상속세:</strong> ${heir.tax.toLocaleString()} 원
             </p>
         `).join('')}
     `;
}
  
  // 가업 개인 상속 계산을 위한 숫자에 콤마를 추가하는 함수 (가업개인/단체 공통)
  function formatNumberWithCommas(value) {
      if (value === null || value === undefined) {
          return '0'; // 기본값 반환
      }
      if (typeof value === 'number') {
          value = value.toString(); // 숫자를 문자열로 변환
      }
      return parseInt(value.replace(/[^0-9]/g, '') || '0', 10).toLocaleString();
  }

    // 유효성 검사 함수 (가업개인/단체 공통)
function validateHeirRelationship(heirType, relationship) {
    const validPairs = {
        adultChild: ['adultChild'], // 성년 자녀 후계자 -> 성년 자녀 관계만 허용
        minorChild: ['minorChild'], // 미성년 자녀 후계자 -> 미성년 자녀 관계만 허용
        other: ['spouse', 'parent', 'sibling', 'other'], // 기타 후계자 -> 부모, 형제자매, 기타만 허용
    };

    if (!validPairs[heirType]?.includes(relationship)) {
        return false; // 잘못된 조합
    }

    return true;
}

    /**
 * 가업 공제 계산 (공용)
 * @param {number} heirAssetValue - 상속인의 상속 재산 금액
 * @param {string} heirType - 상속인의 유형 ('adultChild', 'minorChild', 'other')
 * @param {number} years - 피상속인의 가업 경영 연수
 * @returns {number} 가업 공제 금액
 */
function calculateGaupExemption(heirAssetValue, heirType, years) {
    // 경영 연수에 따른 공제 한도 계산
    function getGaupExemptionLimitByYears(years) {
        if (years >= 30) return 60000000000; // 30년 이상: 최대 600억 원
        if (years >= 20) return 40000000000; // 20년 이상: 최대 400억 원
        if (years >= 10) return 30000000000; // 10년 이상: 최대 300억 원
        return 0; // 10년 미만: 공제 불가
    }

    // 1. 경영 연수에 따른 한도 계산
    const maxExemptionByYears = getGaupExemptionLimitByYears(years);

    // 2. 후계자 유형별 최대 공제 금액 계산
    let maxExemptionByType = 0;
    switch (heirType) {
        case 'adultChild': // 성년 자녀
            maxExemptionByType = heirAssetValue; // 100% 공제 가능
            break;
        case 'minorChild': // 미성년 자녀
            maxExemptionByType = heirAssetValue; // 100% 공제 가능
            break;
        case 'other': // 기타 후계자
            maxExemptionByType = heirAssetValue * 0.5; // 50% 공제 가능
            break;
        default:
            console.error('잘못된 후계자 유형:', heirType);
            return 0;
    }

    // 3. 최종 공제 금액
    const gaupExemption = Math.min(maxExemptionByYears, maxExemptionByType, heirAssetValue);

    console.log(`${heirType} 유형의 가업 공제 금액 (경영 연수 ${years}년):`, gaupExemption);
    return gaupExemption;
}


    // 가업 개인 상속 함수
    function calculateBusinessPersonalMode(totalAssetValue) {
    // 관계와 후계자 유형을 명확히 분리
    const relationship = document.querySelector('#relationshipPersonalBusiness')?.value || 'other';
    const heirType = document.querySelector('#businessHeirTypePersonal')?.value || 'other';
  
    // 가업 공제 계산
    let gaupExemption = 0;

    if (heirType === 'adultChild') {
        if (totalAssetValue <= 5000000000) {
            gaupExemption = Math.min(totalAssetValue, 2000000000);
        } else if (totalAssetValue <= 10000000000) {
            gaupExemption = Math.min(totalAssetValue, 5000000000);
        } else {
            gaupExemption = Math.min(totalAssetValue, 10000000000);
        }
    } else if (heirType === 'minorChild') {
        gaupExemption = totalAssetValue * 0.6;
    } else if (heirType === 'other') {
        gaupExemption = totalAssetValue * 0.3;
    } else {
        // 잘못된 후계자 유형이 들어왔을 경우 기본값 설정
        console.error('잘못된 후계자 유형 선택:', heirType);
        heirType = 'other'; // 기본값 설정
    }

    // 관계 공제 계산
    const exemptions = calculateExemptions(totalAssetValue, relationship, gaupExemption);

    // `relationshipExemption` 가져오기
    const { relationshipExemption } = exemptions;

    // 총 공제 금액 계산
    const totalExemption = gaupExemption + relationshipExemption;

    // 과세 금액 계산
    const taxableAmount = Math.max(totalAssetValue - totalExemption, 0);

    // 상속세 계산
    const tax = calculateTax(taxableAmount);

    // 결과 출력
    document.getElementById('result').innerHTML = `
        <h3>계산 결과 (가업 개인 상속)</h3>
        <p>총 재산 금액: ${totalAssetValue.toLocaleString()} 원</p>
        <p><strong>공제 내역:</strong></p>
        <ul>
            <li>가업 공제: ${gaupExemption.toLocaleString()} 원</li>
            <li>관계 공제: ${relationshipExemption.toLocaleString()} 원 (${relationship})</li>
        </ul>
        <p><strong>총 공제 금액:</strong> ${totalExemption.toLocaleString()} 원</p>
        <p>과세 금액: ${taxableAmount.toLocaleString()} 원</p>
        <p>상속세: ${tax.toLocaleString()} 원</p>
    `;
}

 // 가업 단체 상속 계산 함수
function calculateBusinessGroupMode(totalAssetValue) {
    console.log('--- 가업 단체 상속 계산 시작 ---');
    console.log('총 재산 금액:', totalAssetValue);

    // 상속인 데이터 저장
    const heirs = Array.from(document.querySelectorAll('.heir-entry-group')).map((heir, index) => {
        console.log(`상속인 ${index + 1} 데이터 수집 시작`);

        const name = heir.querySelector('.heirName')?.value || `상속인 ${index + 1}`;
        const heirType = heir.querySelector('.heirType')?.value || 'other';
        const relationship = heir.querySelector('.relationship')?.value || 'other';
        const sharePercentage = parseFloat(heir.querySelector('.sharePercentageField')?.value || '0');

        if (!name || sharePercentage <= 0 || isNaN(sharePercentage)) {
            console.error(`${name}의 필수 데이터가 누락되었거나 상속 비율이 잘못되었습니다.`);
            alert(`${name}의 데이터를 확인해주세요. 상속 비율은 0보다 커야 합니다.`);
            return null;
        }

        // 상속 재산 계산
        const heirAssetValue = (totalAssetValue * sharePercentage) / 100;
        console.log(`${name}의 상속 재산 금액:`, heirAssetValue);

        // 가업 공제 계산
        const gaupExemption = calculateGaupExemption(heirAssetValue, heirType);
        console.log(`${name}의 가업 공제:`, gaupExemption);

        // 관계 공제 계산
        const { relationshipExemption } = calculateExemptions(heirAssetValue, relationship);

        // 총 공제 계산
        const totalExemption = gaupExemption + relationshipExemption;
        console.log(`${name}의 총 공제 금액:`, totalExemption);

        // 과세 금액 계산
        const taxableAmount = Math.max(heirAssetValue - totalExemption, 0);
        const tax = calculateTax(taxableAmount);
        console.log(`${name}의 과세 금액:`, taxableAmount);
        console.log(`${name}의 상속세:`, tax);

        return {
            name,
            heirAssetValue,
            gaupExemption,
            relationshipExemption,
            totalExemption,
            taxableAmount,
            tax,
        };
    }).filter(Boolean);

    // 계산 결과 요약
    const totalInheritedAssets = heirs.reduce((sum, heir) => sum + heir.heirAssetValue, 0);
    const totalExemption = heirs.reduce((sum, heir) => sum + heir.totalExemption, 0);
    const totalTax = heirs.reduce((sum, heir) => sum + heir.tax, 0);

    console.log('--- 최종 계산 결과 ---');
    console.log('총 상속 재산:', totalInheritedAssets);
    console.log('총 공제 금액:', totalExemption);
    console.log('총 상속세:', totalTax);

    // 결과 출력
    document.getElementById('result').innerHTML = `
        <h3>계산 결과 (가업 단체 상속)</h3>
        <p><strong>총 상속 재산:</strong> ${formatNumberWithCommas(totalInheritedAssets)} 원</p>
        <p><strong>총 공제 금액:</strong> ${formatNumberWithCommas(totalExemption)} 원</p>
        <p><strong>총 상속세:</strong> ${formatNumberWithCommas(totalTax)} 원</p>
        ${heirs.map(heir => `
            <p>
                <strong>${heir.name}</strong>:<br>
                - 상속 재산: ${formatNumberWithCommas(heir.heirAssetValue)} 원<br>
                - 가업 공제: ${formatNumberWithCommas(heir.gaupExemption)} 원<br>
                - 관계 공제: ${formatNumberWithCommas(heir.relationshipExemption)} 원<br>
                - 총 공제 금액: ${formatNumberWithCommas(heir.totalExemption)} 원<br>
                - 과세 금액: ${formatNumberWithCommas(heir.taxableAmount)} 원<br>
                - 상속세: ${formatNumberWithCommas(heir.tax)} 원
            </p>
        `).join('')}
    `;
}

// 계산 버튼 이벤트
calculateButton.addEventListener('click', () => {
    const relationship = document.querySelector('#relationshipPersonalBusiness')?.value || 'other';
    const heirType = document.querySelector('#businessHeirTypePersonal')?.value || 'other';

    // 유효성 검사 실행
    if (!validateHeirRelationship(heirType, relationship)) {
        alert('선택한 후계자 유형과 관계가 맞지 않습니다. 올바른 조합을 선택해주세요.');
        return; // 계산 중단
    }

    // 총 재산 금액 계산
    const totalAssetValue = Array.from(document.querySelectorAll('.assetValue')).reduce((sum, field) => {
        const value = parseInt(field.value.replace(/,/g, '') || '0', 10);
        return sum + value;
    }, 0);

    // 상속 유형에 따라 계산 실행
    switch (inheritanceType.value) {
        case 'personal': // 개인 상속
            calculatePersonalMode(totalAssetValue);
            break;
        case 'group': // 단체 상속
            calculateGroupMode(totalAssetValue);
            break;
        case 'businessPersonal': // 가업 개인 상속
            calculateBusinessPersonalMode(totalAssetValue);
            break;
        case 'businessGroup': // 가업 단체 상속
            calculateBusinessGroupMode(totalAssetValue);
            break;
        default:
            console.error('잘못된 계산 요청');
            break;
    }
});
    
// 숫자 포맷 함수
document.addEventListener('input', (event) => {
    const target = event.target;
    const applicableFields = [
        'cashAmount',
        'realEstateValue',
        'stockQuantity',
        'stockPrice',
        'stockTotal',
        'mixedCashAmount',
        'mixedRealEstateValue',
        'mixedStockPrice'
    ];

    if (applicableFields.includes(target.id)) {
        const rawValue = target.value.replace(/[^0-9]/g, '');
        target.value = rawValue ? parseInt(rawValue, 10).toLocaleString() : '';
    }
});

// 숫자 입력 필드에 콤마 추가
document.addEventListener('input', function (event) {
    const target = event.target;

    // 콤마 적용 대상 필드 ID
    const applicableFields = [
        'cashAmount',          // 현금
        'realEstateValue',     // 부동산 평가액
        'stockPrice',          // 주당 가격
        'stockTotal',          // 주식 총액
        'mixedCashAmount',     // 혼합 자산 현금
        'mixedRealEstateValue',// 혼합 자산 부동산
        'mixedStockPrice',     // 혼합 자산 주식
        'fatherAmountInput',   // 아버지 금액
        'motherAmountInput',   // 어머니 금액
        'totalAssetValue',     // 추가된 필드
    ];

    // 주식 수량은 제외 (콤마를 넣지 않음)
    if (target.id === 'stockQuantity') {
        return; // 콤마 처리 생략
    }

    // 해당 필드에 대해 콤마 적용
    if (applicableFields.includes(target.id)) {
        const rawValue = target.value.replace(/[^0-9]/g, ''); // 숫자 이외 문자 제거
        target.value = rawValue ? parseInt(rawValue, 10).toLocaleString() : ''; // 숫자에 콤마 추가
    }
});
     
// 주식 총 금액 계산
document.addEventListener('input', function () {
    const stockQuantity = document.getElementById('stockQuantity');
    const stockPrice = document.getElementById('stockPrice');
    const stockTotal = document.getElementById('stockTotal');

    if (stockQuantity && stockPrice && stockTotal) {
        const quantity = parseInt(stockQuantity.value.replace(/[^0-9]/g, '') || '0', 10);
        const price = parseInt(stockPrice.value.replace(/[^0-9]/g, '') || '0', 10);
        stockTotal.value = (quantity * price).toLocaleString();
    }

    const mixedStockQuantity = document.getElementById('mixedStockQuantity');
    const mixedStockPrice = document.getElementById('mixedStockPrice');
    const mixedTotalAmount = document.getElementById('mixedTotalAmount');

    if (mixedStockQuantity && mixedStockPrice && mixedTotalAmount) {
        const quantity = parseInt(mixedStockQuantity.value.replace(/[^0-9]/g, '') || '0', 10);
        const price = parseInt(mixedStockPrice.value.replace(/[^0-9]/g, '') || '0', 10);
        const total = quantity * price;
        const cash = parseInt(document.getElementById('mixedCashAmount').value.replace(/[^0-9]/g, '') || '0', 10);
        const realEstate = parseInt(document.getElementById('mixedRealEstateValue').value.replace(/[^0-9]/g, '') || '0', 10);

        mixedTotalAmount.value = (total + cash + realEstate).toLocaleString();
    }
});
       
}); // document.addEventListener 닫는 괄호 
