const fs = require('fs');
const path = require('path');

// 사용하지 않는 import 제거 함수
function removeUnusedImports(filePath, unusedImports) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    unusedImports.forEach(importName => {
        // import 문에서 해당 import 제거
        const importRegex = new RegExp(`,?\\s*${importName}\\s*,?`, 'g');
        content = content.replace(importRegex, (match) => {
            if (match.startsWith(',') && match.endsWith(',')) {
                return ',';
            } else if (match.startsWith(',')) {
                return '';
            } else if (match.endsWith(',')) {
                return '';
            }
            return '';
        });
    });
    
    // 빈 import 구문 정리
    content = content.replace(/import\s*{\s*}\s*from[^;]*;/g, '');
    content = content.replace(/,\s*}/g, '\n}');
    content = content.replace(/{\s*,/g, '{');
    
    fs.writeFileSync(filePath, content);
}

// 사용하지 않는 변수 제거 함수  
function removeUnusedVariables(filePath, unusedVars) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    unusedVars.forEach(varName => {
        // const [var, setVar] = useState() 형태 제거
        const stateRegex = new RegExp(`\\s*const\\s*\\[\\s*${varName}\\s*,\\s*\\w+\\s*\\]\\s*=\\s*useState\\([^)]*\\);?\\s*`, 'g');
        content = content.replace(stateRegex, '');
        
        // const var = ... 형태 제거
        const constRegex = new RegExp(`\\s*const\\s+${varName}\\s*=\\s*[^;]*;?\\s*`, 'g');
        content = content.replace(constRegex, '');
    });
    
    fs.writeFileSync(filePath, content);
}

// img 태그를 Next.js Image로 교체
function replaceImgTags(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Next.js Image import 추가
    if (!content.includes('import Image from "next/image"')) {
        const importIndex = content.indexOf('import');
        if (importIndex !== -1) {
            content = content.slice(0, importIndex) + 'import Image from "next/image";\n' + content.slice(importIndex);
        }
    }
    
    // <img> 태그를 <Image> 태그로 교체
    content = content.replace(/<img\s+([^>]*)\s*\/?>/g, (match, attributes) => {
        // src 속성 추출
        const srcMatch = attributes.match(/src=["']([^"']*)["']/);
        const altMatch = attributes.match(/alt=["']([^"']*)["']/);
        const classMatch = attributes.match(/className=["']([^"']*)["']/);
        
        let imageProps = '';
        if (srcMatch) imageProps += `src="${srcMatch[1]}" `;
        if (altMatch) imageProps += `alt="${altMatch[1]}" `;
        if (classMatch) imageProps += `className="${classMatch[1]}" `;
        
        // width, height 기본값 추가
        imageProps += 'width={500} height={300} ';
        
        return `<Image ${imageProps}/>`;
    });
    
    fs.writeFileSync(filePath, content);
}

// 에러 파일별 처리
const errorFixes = {
    'src/app/admin/cruise/create/page.tsx': {
        unusedImports: [],
        unusedVars: [],
        hasImgTag: true
    },
    'src/app/admin/cruise/page.tsx': {
        unusedImports: [],
        unusedVars: ['handleDelete'],
        hasImgTag: true,
        addImport: 'Filter'
    },
    'src/app/admin/event/reviews/page.tsx': {
        unusedImports: ['CardHeader', 'CardTitle', 'Calendar', 'Filter', 'ThumbsUp', 'Upload', 'ImageIcon'],
        unusedVars: [],
        hasImgTag: true
    },
    'src/app/admin/event/sns/page.tsx': {
        unusedImports: ['CardHeader', 'CardTitle', 'Filter', 'ImageIcon', 'Upload'],
        unusedVars: [],
        hasImgTag: true
    },
    'src/app/admin/notice/page.tsx': {
        unusedImports: ['CardHeader', 'CardTitle', 'MoreHorizontal'],
        unusedVars: []
    },
    'src/app/admin/page.tsx': {
        unusedImports: ['TrendingDown', 'LineChart', 'Line'],
        unusedVars: []
    }
};

// 에러 수정 실행
Object.entries(errorFixes).forEach(([filePath, fixes]) => {
    console.log(`Fixing ${filePath}...`);
    
    if (fixes.unusedImports.length > 0) {
        removeUnusedImports(filePath, fixes.unusedImports);
    }
    
    if (fixes.unusedVars.length > 0) {
        removeUnusedVariables(filePath, fixes.unusedVars);
    }
    
    if (fixes.hasImgTag) {
        replaceImgTags(filePath);
    }
    
    if (fixes.addImport) {
        // Filter import 추가 로직
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/} from "lucide-react";/, `, ${fixes.addImport}} from "lucide-react";`);
        fs.writeFileSync(filePath, content);
    }
});

console.log('Error fixes completed!');
