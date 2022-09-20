package com.example.backend.service;

import com.example.backend.entity.CartItem;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }
    public List<CartItem> getAllCartItemByUserId(Long id){
        return cartItemRepository.getAllCartItemByUserId(id);
    }
    public CartItem getCartItemById(Long id) throws RecordNotFoundException {
        Optional<CartItem> cartItem = cartItemRepository.findById(id);
        if(cartItem.isPresent()){
            return cartItem.get();
        }
        throw new RecordNotFoundException("Cart Item Not Found");
    }
    public void saveOrUpdateCartItem(CartItem newCartItem) throws RecordNotFoundException {
        if(newCartItem.getId() == null){
            cartItemRepository.save(newCartItem);
        }
        // DO WE NEED TO UPDATE THE WHOLE CART ITEM, OR JUST THE QUANTITY?
        else{
            CartItem cartItemFromDb = getCartItemById(newCartItem.getId());
            cartItemFromDb.setMenu(newCartItem.getMenu());
            cartItemFromDb.setQuantity(newCartItem.getQuantity());
            cartItemFromDb.setTable(newCartItem.getTable());
            cartItemFromDb.setTakeout(newCartItem.isTakeout());
            cartItemRepository.save(cartItemFromDb);
        }
    }
    public void updateCartItemQuantity(Long cartItemId, int quantity) throws RecordNotFoundException {
        CartItem cartItem = getCartItemById(cartItemId);
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
    }
    public void deleteCartItemById(Long id){
        cartItemRepository.deleteById(id);
    }

    public void deleteCartItemByUserId(Long id){
        List<CartItem> cartItems = getAllCartItemByUserId(id);
        for (CartItem item: cartItems) {
            cartItemRepository.deleteById(item.getId());
        }
    }
}
