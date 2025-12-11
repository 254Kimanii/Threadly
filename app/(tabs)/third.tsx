import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, Pressable } from 'react-native';
import { JSX, useState } from 'react';
import { Svg, Circle, Path, G } from 'react-native-svg';
import { materials } from '@/data/materials';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Third() {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [hexInput, setHexInput] = useState('#FF0000');
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  
  const router = useRouter();
  const params = useLocalSearchParams();
  const height = params.height as string;
  const weight = params.weight as string;
  const skinTone = params.skinTone as string;

  const baseHues = [
    0, 18, 36, 54, 72, 90, 108, 126, 144, 162,
    180, 198, 216, 234, 252, 270, 288, 306, 324, 342
  ];

  const generateShades = (hue: number) => {
    const shades = [];
    for (let i = 0; i < 8; i++) {
      const lightness = 90 - i * 10;
      shades.push(`hsl(${hue}, 100%, ${lightness}%)`);
    }
    return shades;
  };

  const handleColorWheelPress = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const centerX = 175;
    const centerY = 175;
    
    const dx = locationX - centerX;
    const dy = locationY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    
    const anglePerHue = 360 / baseHues.length;
    const hueIndex = Math.floor(angle / anglePerHue) % baseHues.length;
    const radiusStep = 120 / 8;
    const shadeIndex = Math.min(Math.floor(distance / radiusStep), 7);
    
    if (distance <= 120 && distance >= 0) {
      const hue = baseHues[hueIndex];
      const shades = generateShades(hue);
      const color = shades[shadeIndex];
      setSelectedColor(color);
      setHexInput(color);
    }
  };

  const handleRecommend = () => {
    router.push({
      pathname: '/recommendation',
      params: {
        height,
        weight,
        skinTone,
        color: selectedColor,
        material: selectedMaterial || 'Not selected'
      }
    });
  };

  const renderColorSegments = () => {
    const segments: JSX.Element[] = [];
    const centerX = 175;
    const centerY = 175;
    const numHues = baseHues.length;
    const anglePerHue = 360 / numHues;

    baseHues.forEach((hue, hueIndex) => {
      const shades = generateShades(hue);
      const radiusStep = 120 / shades.length;

      shades.forEach((color, shadeIndex) => {
        const innerRadius = shadeIndex * radiusStep;
        const outerRadius = (shadeIndex + 1) * radiusStep;
        const startAngle = (hueIndex * anglePerHue - 90) * (Math.PI / 180);
        const endAngle = ((hueIndex + 1) * anglePerHue - 90) * (Math.PI / 180);

        const x1Inner = centerX + innerRadius * Math.cos(startAngle);
        const y1Inner = centerY + innerRadius * Math.sin(startAngle);
        const x1Outer = centerX + outerRadius * Math.cos(startAngle);
        const y1Outer = centerY + outerRadius * Math.sin(startAngle);
        const x2Outer = centerX + outerRadius * Math.cos(endAngle);
        const y2Outer = centerY + outerRadius * Math.sin(endAngle);
        const x2Inner = centerX + innerRadius * Math.cos(endAngle);
        const y2Inner = centerY + innerRadius * Math.sin(endAngle);

        const largeArcFlag = anglePerHue > 180 ? 1 : 0;

        const pathData = shadeIndex === 0
          ? `M ${centerX} ${centerY} L ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} Z`
          : `M ${x1Inner} ${y1Inner} L ${x1Outer} ${y1Outer} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer} L ${x2Inner} ${y2Inner} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner} Z`;

        segments.push(
          <Path
            key={`${hueIndex}-${shadeIndex}`}
            d={pathData}
            fill={color}
            stroke={selectedColor === color ? '#000' : 'transparent'}
            strokeWidth={selectedColor === color ? 3 : 0}
          />
        );
      });
    });

    return segments;
  };

  const renderOuterCircles = () => {
    return baseHues.map((hue, index) => {
      const angle = (index * 360) / baseHues.length - 90;
      const radius = 155;
      const lightness = 50;
      const color = `hsl(${hue}, 100%, ${lightness}%)`;

      const cx = 175 + radius * Math.cos((angle * Math.PI) / 180);
      const cy = 175 + radius * Math.sin((angle * Math.PI) / 180);

      return (
        <Circle
          key={index}
          cx={cx}
          cy={cy}
          r={16}
          fill={color}
          stroke="#FFF"
          strokeWidth={2}
        />
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Pick the shade you wish to wear</Text>

      <TouchableOpacity 
        style={styles.colorWheelContainer} 
        activeOpacity={1}
        onPress={handleColorWheelPress}
      >
        <Svg width={350} height={350} viewBox="0 0 350 350">
          <G>
            {renderColorSegments()}
            {renderOuterCircles()}
          </G>
        </Svg>
      </TouchableOpacity>

      <View style={[styles.selectedColorDisplay, { backgroundColor: selectedColor }]}>
        <TextInput
          style={styles.hexInput}
          value={hexInput}
          onChangeText={(value) => {
            setHexInput(value);
            const isValidHex = /^#([0-9A-Fa-f]{6})$/.test(value);
            if (isValidHex) setSelectedColor(value);
          }}
          placeholder="#RRGGBB"
          placeholderTextColor="#ccc"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={7}
        />
      </View>

      <View style={styles.materialSection}>
        <Text style={styles.materialTitle}>Materials & Textures</Text>

        <View style={styles.materialList}>
          {materials.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.materialItem,
                selectedMaterial === item.name && styles.materialSelected
              ]}
              onPress={() => setSelectedMaterial(item.name)}
            >
              <Image source={item.image} style={styles.materialImage} />
              <Text style={styles.materialName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMaterial && (
          <View style={styles.materialDisplay}>
            <Text style={styles.materialDisplayText}>
              Selected Material: {selectedMaterial}
            </Text>
          </View>
        )}
      </View>

      <Pressable style={styles.button} onPress={handleRecommend}>
        <Text style={styles.buttonText}>Recommend</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  colorWheelContainer: {
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 175,
    elevation: 8,
  },
  selectedColorDisplay: {
    marginTop: 40,
    width: 250,
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#333',
    elevation: 5,
  },
  hexInput: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '80%',
  },
  materialSection: {
    marginTop: 40,
    width: '100%',
  },
  materialTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  materialList: {
    width: '100%',
    gap: 12,
  },
  materialItem: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  materialSelected: {
    borderColor: '#0077ff',
    borderWidth: 2,
  },
  materialImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 15,
  },
  materialName: {
    fontSize: 18,
    fontWeight: '600',
  },
  materialDisplay: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  materialDisplayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});