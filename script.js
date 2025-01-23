// ✅ 상속 유형 변경 이벤트 리스너
    inheritanceType.addEventListener('change', () => {
        console.log(`🔄 선택된 상속 유형: ${inheritanceType.value}`);
        resetSections();

        if (inheritanceType.value === 'other') {
            if (otherSection) otherSection.style.display = 'block';
            if (otherAssetContainer) otherAssetContainer.style.display = 'block';
            if (otherFieldsContainer) otherFieldsContainer.style.display = 'block';
        }

        switch (inheritanceType.value) {
            case 'personal': 
                if (personalSection) personalSection.style.display = 'block'; 
                break;
            case 'group': 
                if (groupSection) groupSection.style.display = 'block'; 
                break;
            case 'businessPersonal': 
                if (businessPersonalSection) businessPersonalSection.style.display = 'block'; 
                break;
            case 'other': 
                if (otherSection) otherSection.style.display = 'block';
                if (otherAssetContainer) otherAssetContainer.style.display = 'block'; 
                break;
            default: 
                console.error('❌ 잘못된 상속 유형 선택'); 
                break;
        }
    });

    // ✅ 기타 상속 유형(동거주택, 영농, 공장) 선택 시 해당 필드만 표시
    otherAssetType.addEventListener('change', () => {
        console.log(`🔄 기타 상속 유형 선택: ${otherAssetType.value}`);

        // 모든 필드 숨기기
        if (dwellingFields) dwellingFields.style.display = 'none';
        if (farmingFields) farmingFields.style.display = 'none';
        if (factoryFields) factoryFields.style.display = 'none';

        switch (otherAssetType.value) {
            case 'dwelling':
                if (dwellingFields) dwellingFields.style.display = 'block';
                break;
            case 'farming':
                if (farmingFields) {
                    farmingFields.style.display = 'block';
                    document.getElementById('farmingYears').value = 10; // 자동 10년 이상 입력
                }
                break;
            case 'factory':
                if (factoryFields) {
                    factoryFields.style.display = 'block';
                    document.getElementById('factoryYears').value = 10; // 자동 10년 이상 입력
                }
                break;
        }
    });

    console.log("✅ 스크립트 실행 완료");
});
