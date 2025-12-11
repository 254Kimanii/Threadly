import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Recommendation() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const height = params.height as string;
  const weight = params.weight as string;
  const skinTone = params.skinTone as string;
  const color = params.color as string;
  const material = params.material as string;

  useEffect(() => {
    generateRecommendations();
  }, []);

  const getSkinToneDescription = (tone: string) => {
    const toneMap: { [key: string]: string } = {
      'very_fair': 'Very Fair',
      'fair': 'Fair',
      'light': 'Light',
      'light_medium': 'Light Medium',
      'medium': 'Medium',
      'medium_tan': 'Medium Tan',
      'tan': 'Tan',
      'deep': 'Deep',
      'very_deep': 'Very Deep'
    };
    return toneMap[tone] || tone;
  };

  const getHeightCategory = (heightCm: number) => {
    if (heightCm < 160) return 'shorter';
    if (heightCm > 180) return 'taller';
    return 'average';
  };

  const generateRecommendations = async () => {
    setLoading(true);
    
    setTimeout(() => {
      const heightNum = parseInt(height);
      const heightCategory = getHeightCategory(heightNum);
      const skinToneDesc = getSkinToneDescription(skinTone);

      // Determine color advice based on skin tone
      let colorAdvice = '';
      if (['very_fair', 'fair', 'light'].includes(skinTone)) {
        colorAdvice = 'Jewel tones (emerald, sapphire) and pastels complement your fair complexion beautifully.';
      } else if (['light_medium', 'medium', 'medium_tan'].includes(skinTone)) {
        colorAdvice = 'You can rock almost any color! Earth tones and rich jewels work especially well.';
      } else {
        colorAdvice = 'Bold, vibrant colors and deep jewel tones create stunning contrast with your skin tone.';
      }

      // Height-specific advice
      let heightAdvice = '';
      if (heightCategory === 'shorter') {
        heightAdvice = 'Vertical lines and monochromatic outfits will elongate your silhouette. High-waisted bottoms are your best friend!';
      } else if (heightCategory === 'taller') {
        heightAdvice = 'You can pull off bold patterns and oversized fits with ease. Experiment with layering and wide belts.';
      } else {
        heightAdvice = 'Your proportions are versatile - both fitted and slightly relaxed pieces work great for you.';
      }

      const mockRecommendations = `
🎨 COLOR TIPS

${colorAdvice}

Your chosen color (${color}) works great as a statement piece or accent. Pair it with neutrals like white, navy, or beige for a balanced look.


📏 STYLE FOR YOUR HEIGHT

${heightAdvice}

Remember: Balance is key. If your top is loose, keep the bottom fitted, and vice versa.


🧵 MATERIAL INSIGHT

${material} is versatile and comfortable. It pairs well with denim for casual looks or can be dressed up with tailored pieces for formal occasions.


👔 3 OUTFIT IDEAS

**1. Casual Day Out**
${color} ${material} top + dark jeans + white sneakers

**2. Smart Casual**
${color} ${material} shirt + chinos + loafers + blazer (optional)

**3. Evening Look**
${color} ${material} piece + black trousers/skirt + dress shoes + minimal jewelry


👟 QUICK ACCESSORY GUIDE

- Shoes: Match the formality - sneakers (casual), loafers (smart-casual), dress shoes (formal)
- Keep jewelry minimal - one statement piece is enough
- Belt and shoes should match in color


💡 KEY TAKEAWAY

Focus on well-fitted clothes that make you feel confident. Your color (${color}) and material choice (${material}) are great foundations - build around them with versatile basics!
`;

      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Your Style Guide</Text>
      
      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Your Profile</Text>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Height:</Text>
          <Text style={styles.profileValue}>{height} cm</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Weight:</Text>
          <Text style={styles.profileValue}>{weight} kg</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Skin Tone:</Text>
          <Text style={styles.profileValue}>{getSkinToneDescription(skinTone)}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Color:</Text>
          <View style={[styles.colorSwatch, { backgroundColor: color }]} />
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Material:</Text>
          <Text style={styles.profileValue}>{material}</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Creating your style guide...</Text>
        </View>
      ) : (
        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsText}>{recommendations}</Text>
        </View>
      )}

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Try Different Options</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#007AFF',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileLabel: {
    fontSize: 16,
    color: '#666',
    width: 100,
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#333',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  recommendationsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationsText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});